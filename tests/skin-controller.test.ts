import { IDBFactory } from 'fake-indexeddb'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SkinController } from '../src/client/skin-controller.ts'

describe('SkinController', () => {
  beforeEach(() => {
    localStorage.clear()
    Object.defineProperty(globalThis, 'indexedDB', {
      configurable: true,
      value: new IDBFactory(),
    })
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => 'blob:test-wallpaper'),
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    })
  })

  it('initializes an empty local wallpaper library', async () => {
    const controller = new SkinController()

    await controller.initialize()

    expect(controller.getSnapshot()).toMatchObject({
      ready: true,
      enabled: true,
      wallpapers: [],
    })
    controller.dispose()
  })

  it('clamps appearance settings before persisting them', () => {
    const controller = new SkinController()

    controller.setDim(100)
    controller.setBlur(-5)
    controller.setSurface(0)

    expect(controller.getSnapshot()).toMatchObject({ dim: 75, blur: 0, surface: 10 })
    expect(JSON.parse(localStorage.getItem('dsh-custom-skin.preferences.v1') ?? '{}')).toMatchObject({
      dim: 75,
      blur: 0,
      surface: 10,
    })
    controller.dispose()
  })

  it('recovers the operation queue after a storage mutation fails', async () => {
    const controller = new SkinController()
    let transactionCount = 0
    const database = {
      close: vi.fn(),
      transaction: () => {
        transactionCount += 1
        if (transactionCount === 1) {
          const transaction = {
            error: new Error('forced deletion failure'),
            objectStore: () => ({
              delete: () => { queueMicrotask(() => { transaction.onerror?.(new Event('error')) }) },
            }),
            onabort: null as ((event: Event) => void) | null,
            oncomplete: null as ((event: Event) => void) | null,
            onerror: null as ((event: Event) => void) | null,
          }
          return transaction
        }
        const transaction = {
          error: null,
          objectStore: () => ({
            put: () => { queueMicrotask(() => { transaction.oncomplete?.(new Event('complete')) }) },
          }),
          onabort: null as ((event: Event) => void) | null,
          oncomplete: null as ((event: Event) => void) | null,
          onerror: null as ((event: Event) => void) | null,
        }
        return transaction
      },
    }
    ;(controller as unknown as { database: typeof database }).database = database

    await controller.remove('missing')
    expect(controller.getSnapshot().error).toBe('mutation')

    await controller.addFiles([new File(['x'], 'valid.png', { type: 'image/png' })])
    expect(transactionCount).toBe(2)
    expect(controller.getSnapshot()).toMatchObject({ error: undefined })
    expect(controller.getSnapshot().wallpapers).toHaveLength(1)
    controller.dispose()
  })
})
