/** IndexedDB wallpaper persistence and DOM presentation. */

const DB_NAME = 'dsh-custom-skin'
const DB_VERSION = 1
const STORE = 'wallpapers'
const PREFS_KEY = 'dsh-custom-skin.preferences.v1'
const MAX_IMAGE_BYTES = 20 * 1024 * 1024
const MAX_IMAGES = 24
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])

export type ImageFit = 'cover' | 'contain' | 'fill'
export type ImagePosition = 'center' | 'top' | 'bottom'

export interface WallpaperSummary {
  id: string
  name: string
  url: string
  createdAt: number
}

interface WallpaperRecord {
  id: string
  name: string
  type: string
  blob: Blob
  createdAt: number
}

interface SkinPreferences {
  activeId?: string
  enabled: boolean
  fit: ImageFit
  position: ImagePosition
  dim: number
  blur: number
  surface: number
}

export interface SkinSnapshot extends SkinPreferences {
  ready: boolean
  error?: 'storage' | 'invalid-file' | 'upload' | 'mutation'
  wallpapers: readonly WallpaperSummary[]
}

const DEFAULTS: SkinPreferences = {
  enabled: true,
  fit: 'cover',
  position: 'center',
  dim: 12,
  blur: 0,
  surface: 44,
}

const TOKENS = [
  '--dsw-alias-bg-base', '--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2',
  '--dsw-alias-bg-layer-3', '--dsw-alias-bg-module-platform', '--dsw-alias-bg-overlay',
  '--dsw-specific-input-major', '--dsw-specific-sidebar-fill', '--dsw-specific-selector',
  '--dsw-specific-sidebar-nav-item-active', '--dsw-specific-sidebar-nav-item-hover',
] as const

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function parsePreferences(): SkinPreferences {
  try {
    const value = JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}') as Partial<SkinPreferences>
    return {
      activeId: typeof value.activeId === 'string' ? value.activeId : undefined,
      enabled: typeof value.enabled === 'boolean' ? value.enabled : DEFAULTS.enabled,
      fit: value.fit === 'contain' || value.fit === 'fill' ? value.fit : DEFAULTS.fit,
      position: value.position === 'top' || value.position === 'bottom' ? value.position : DEFAULTS.position,
      dim: clamp(Number(value.dim ?? DEFAULTS.dim), 0, 75),
      blur: clamp(Number(value.blur ?? DEFAULTS.blur), 0, 24),
      surface: clamp(Number(value.surface ?? DEFAULTS.surface), 10, 96),
    }
  } catch {
    return { ...DEFAULTS }
  }
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => { resolve(request.result) }
    request.onerror = () => { reject(request.error ?? new Error('IndexedDB request failed')) }
  })
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => { resolve() }
    transaction.onabort = () => { reject(transaction.error ?? new Error('IndexedDB transaction aborted')) }
    transaction.onerror = () => { reject(transaction.error ?? new Error('IndexedDB transaction failed')) }
  })
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => { resolve(request.result) }
    request.onerror = () => { reject(request.error ?? new Error('IndexedDB open failed')) }
  })
}

function makeId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/** Owns one browser's wallpaper library and presentation state. */
export class SkinController {
  private snapshot: SkinSnapshot = { ...parsePreferences(), ready: false, wallpapers: [] }
  private readonly listeners = new Set<() => void>()
  private readonly objectUrls = new Map<string, string>()
  private readonly originalTokens = new Map<string, { value: string; priority: string }>()
  private readonly writtenTokens = new Map<string, string>()
  private database?: IDBDatabase
  private initialization?: Promise<void>
  private queue: Promise<void> = Promise.resolve()
  private disposed = false
  private readonly observer: MutationObserver

  constructor() {
    this.observer = new MutationObserver(() => { this.applyPresentation() })
    this.observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
  }

  /** Return the immutable current snapshot. */
  getSnapshot = (): SkinSnapshot => this.snapshot

  /** Subscribe to state changes. */
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  /** Load the local wallpaper library and apply the saved choice. */
  initialize(): Promise<void> {
    this.initialization ??= this.load()
    return this.initialization
  }

  private async load(): Promise<void> {
    try {
      this.database = await openDatabase()
      const transaction = this.database.transaction(STORE, 'readonly')
      const records = await requestResult(transaction.objectStore(STORE).getAll()) as WallpaperRecord[]
      const wallpapers = records
        .sort((left, right) => right.createdAt - left.createdAt)
        .map(record => ({
          id: record.id,
          name: record.name,
          createdAt: record.createdAt,
          url: this.createUrl(record.id, record.blob),
        }))
      const activeId = wallpapers.some(item => item.id === this.snapshot.activeId)
        ? this.snapshot.activeId
        : wallpapers[0]?.id
      this.publish({ ...this.snapshot, activeId, ready: true, wallpapers })
      this.persist()
    } catch {
      this.publish({ ...this.snapshot, ready: true, error: 'storage' })
    }
  }

  /** Add supported images to the local library. */
  addFiles(files: readonly File[]): Promise<void> {
    const valid = files.filter(file => IMAGE_TYPES.has(file.type) && file.size > 0 && file.size <= MAX_IMAGE_BYTES)
    const skipped = valid.length !== files.length
    return this.enqueue(async () => {
      await this.initialization
      if (valid.length === 0) {
        if (skipped) this.publish({ ...this.snapshot, error: 'invalid-file' })
        return
      }
      if (this.database === undefined) {
        this.publish({ ...this.snapshot, error: 'storage' })
        return
      }
      const capacity = Math.max(0, MAX_IMAGES - this.snapshot.wallpapers.length)
      const accepted = valid.slice(0, capacity)
      const transaction = this.database.transaction(STORE, 'readwrite')
      const records = accepted.map((file, index): WallpaperRecord => ({
        id: makeId(),
        name: file.name,
        type: file.type,
        blob: file,
        createdAt: Date.now() + index,
      }))
      for (const record of records) transaction.objectStore(STORE).put(record)
      await transactionDone(transaction)
      const added = records.map(record => ({
        id: record.id,
        name: record.name,
        createdAt: record.createdAt,
        url: this.createUrl(record.id, record.blob),
      })).reverse()
      this.publish({
        ...this.snapshot,
        activeId: this.snapshot.activeId ?? added[0]?.id,
        error: skipped || accepted.length !== valid.length ? 'invalid-file' : undefined,
        wallpapers: [...added, ...this.snapshot.wallpapers],
      })
      this.persist()
    }, 'upload')
  }

  /** Select one saved image. */
  select(id: string): void {
    if (!this.snapshot.wallpapers.some(item => item.id === id)) return
    this.update({ activeId: id, enabled: true, error: undefined })
  }

  /** Delete one saved image. */
  remove(id: string): Promise<void> {
    return this.enqueue(async () => {
      if (this.database === undefined) return
      const transaction = this.database.transaction(STORE, 'readwrite')
      transaction.objectStore(STORE).delete(id)
      await transactionDone(transaction)
      const wallpapers = this.snapshot.wallpapers.filter(item => item.id !== id)
      const url = this.objectUrls.get(id)
      if (url !== undefined) URL.revokeObjectURL(url)
      this.objectUrls.delete(id)
      this.publish({
        ...this.snapshot,
        activeId: this.snapshot.activeId === id ? wallpapers[0]?.id : this.snapshot.activeId,
        wallpapers,
        error: undefined,
      })
      this.persist()
    }, 'mutation')
  }

  /** Delete the complete local image library. */
  clear(): Promise<void> {
    return this.enqueue(async () => {
      if (this.database === undefined) return
      const transaction = this.database.transaction(STORE, 'readwrite')
      transaction.objectStore(STORE).clear()
      await transactionDone(transaction)
      for (const url of this.objectUrls.values()) URL.revokeObjectURL(url)
      this.objectUrls.clear()
      this.publish({ ...this.snapshot, activeId: undefined, wallpapers: [], error: undefined })
      this.persist()
    }, 'mutation')
  }

  setEnabled(enabled: boolean): void { this.update({ enabled }) }
  setFit(fit: ImageFit): void { this.update({ fit }) }
  setPosition(position: ImagePosition): void { this.update({ position }) }
  setDim(dim: number): void { this.update({ dim: clamp(dim, 0, 75) }) }
  setBlur(blur: number): void { this.update({ blur: clamp(blur, 0, 24) }) }
  setSurface(surface: number): void { this.update({ surface: clamp(surface, 10, 96) }) }

  /** Restore presentation defaults without deleting images. */
  reset(): void {
    this.publish({ ...this.snapshot, ...DEFAULTS, error: undefined })
    this.persist()
  }

  /** Release DOM state and browser resources. */
  dispose(): void {
    this.disposed = true
    this.observer.disconnect()
    this.database?.close()
    for (const url of this.objectUrls.values()) URL.revokeObjectURL(url)
    this.objectUrls.clear()
    this.clearPresentation()
    this.listeners.clear()
  }

  private update(patch: Partial<SkinPreferences & Pick<SkinSnapshot, 'error'>>): void {
    this.publish({ ...this.snapshot, ...patch })
    this.persist()
  }

  private enqueue(operation: () => Promise<void>, error: 'upload' | 'mutation'): Promise<void> {
    this.queue = this.queue.catch(() => {}).then(async () => {
      if (this.disposed) return
      try {
        await operation()
      } catch {
        this.publish({ ...this.snapshot, error })
      }
    })
    return this.queue
  }

  private publish(snapshot: SkinSnapshot): void {
    if (this.disposed) return
    this.snapshot = Object.freeze({ ...snapshot, wallpapers: Object.freeze([...snapshot.wallpapers]) })
    this.applyPresentation()
    for (const listener of this.listeners) listener()
  }

  private persist(): void {
    const { activeId, enabled, fit, position, dim, blur, surface } = this.snapshot
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ activeId, enabled, fit, position, dim, blur, surface }))
    } catch {
      // Preferences remain live for this page when storage is unavailable.
    }
  }

  private createUrl(id: string, blob: Blob): string {
    const url = URL.createObjectURL(blob)
    this.objectUrls.set(id, url)
    return url
  }

  private applyPresentation(): void {
    const active = this.snapshot.wallpapers.find(item => item.id === this.snapshot.activeId)
    if (!this.snapshot.enabled || active === undefined) {
      this.clearPresentation()
      return
    }
    const body = document.body
    const dark = body.hasAttribute('data-ds-dark-theme')
    const alpha = this.snapshot.surface / 100
    const raised = clamp(alpha + 0.12, 0, 0.98)
    const subtle = clamp(alpha - 0.08, 0, 0.9)
    const rgb = dark ? '18 22 30' : '255 255 255'
    this.captureThemeTokens(body)
    body.dataset.dshCustomSkin = 'on'
    body.style.setProperty('--dsh-skin-image', `url("${active.url}")`)
    body.style.setProperty('--dsh-skin-fit', this.snapshot.fit)
    body.style.setProperty('--dsh-skin-position', this.snapshot.position)
    body.style.setProperty('--dsh-skin-dim', String(this.snapshot.dim / 100))
    body.style.setProperty('--dsh-skin-blur', `${this.snapshot.blur}px`)
    body.style.setProperty('--dsh-skin-fallback', dark ? '#11151d' : '#dce7f1')
    this.writeToken(body, '--dsw-alias-bg-base', `rgb(${rgb} / ${subtle})`)
    this.writeToken(body, '--dsw-alias-bg-layer-1', `rgb(${rgb} / ${alpha})`)
    this.writeToken(body, '--dsw-alias-bg-layer-2', `rgb(${rgb} / ${raised})`)
    this.writeToken(body, '--dsw-alias-bg-layer-3', `rgb(${rgb} / ${raised})`)
    this.writeToken(body, '--dsw-alias-bg-module-platform', `rgb(${rgb} / ${clamp(alpha + 0.08, 0, 0.98)})`)
    this.writeToken(body, '--dsw-alias-bg-overlay', `rgb(${rgb} / ${clamp(alpha + 0.2, 0, 0.99)})`)
    this.writeToken(body, '--dsw-specific-input-major', `rgb(${rgb} / ${raised})`)
    this.writeToken(body, '--dsw-specific-sidebar-fill', `rgb(${rgb} / ${alpha})`)
    this.writeToken(body, '--dsw-specific-selector', `rgb(${rgb} / ${raised})`)
    this.writeToken(body, '--dsw-specific-sidebar-nav-item-active', `rgb(${rgb} / ${clamp(alpha + 0.18, 0, 0.99)})`)
    this.writeToken(body, '--dsw-specific-sidebar-nav-item-hover', `rgb(${rgb} / ${clamp(alpha + 0.1, 0, 0.99)})`)
  }

  private captureThemeTokens(body: HTMLElement): void {
    for (const name of TOKENS) {
      const current = body.style.getPropertyValue(name)
      if (this.writtenTokens.get(name) === current) continue
      this.originalTokens.set(name, { value: current, priority: body.style.getPropertyPriority(name) })
    }
  }

  private writeToken(body: HTMLElement, name: string, value: string): void {
    body.style.setProperty(name, value)
    this.writtenTokens.set(name, value)
  }

  private clearPresentation(): void {
    const body = document.body
    delete body.dataset.dshCustomSkin
    for (const name of [
      '--dsh-skin-image', '--dsh-skin-fit', '--dsh-skin-position', '--dsh-skin-dim',
      '--dsh-skin-blur', '--dsh-skin-fallback',
    ]) body.style.removeProperty(name)
    for (const name of TOKENS) {
      const original = this.originalTokens.get(name)
      if (original === undefined || original.value === '') body.style.removeProperty(name)
      else body.style.setProperty(name, original.value, original.priority)
    }
    this.writtenTokens.clear()
  }
}
