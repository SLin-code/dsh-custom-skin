/** Wallpaper library and skin controls rendered in DSH settings. */

import { useState, type ChangeEvent, type DragEvent } from 'react'
import type { SkinSectionProps } from './contracts.ts'
import type { ImageFit, ImagePosition } from './skin-controller.ts'

/** Render the complete wallpaper settings page. */
export function SkinSection({ t, useSkin, controller }: SkinSectionProps) {
  const state = useSkin(snapshot => snapshot)
  const [dragging, setDragging] = useState(false)

  const add = (files: FileList | null): void => {
    if (files === null) return
    void controller.addFiles([...files])
  }
  const onInput = (event: ChangeEvent<HTMLInputElement>): void => {
    add(event.target.files)
    event.target.value = ''
  }
  const onDrop = (event: DragEvent<HTMLLabelElement>): void => {
    event.preventDefault()
    setDragging(false)
    add(event.dataTransfer.files)
  }

  return (
    <section className="dsh-skin-section">
      <div>
        <h2>{t('title')}</h2>
        <p className="dsh-skin-intro">{t('intro')}</p>
      </div>

      <label
        className="dsh-skin-drop"
        data-dragging={dragging || undefined}
        onDragEnter={() => { setDragging(true) }}
        onDragLeave={() => { setDragging(false) }}
        onDragOver={(event) => { event.preventDefault() }}
        onDrop={onDrop}
      >
        <strong>{t('upload')}</strong>
        <span className="dsh-skin-hint">{t('uploadHint')}</span>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple onChange={onInput} />
      </label>

      {state.error !== undefined && (
        <p className="dsh-skin-error" role="alert">
          {t(state.error === 'storage'
            ? 'storageError'
            : state.error === 'invalid-file'
              ? 'invalidFile'
              : state.error === 'mutation'
                ? 'mutationError'
                : 'uploadError')}
        </p>
      )}

      {!state.ready
        ? <p className="dsh-skin-hint">{t('loading')}</p>
        : state.wallpapers.length === 0
          ? <p className="dsh-skin-hint">{t('empty')}</p>
          : (
            <div className="dsh-skin-grid">
              {state.wallpapers.map(item => {
                const active = item.id === state.activeId
                return (
                  <article className="dsh-skin-card" data-active={active || undefined} key={item.id}>
                    <img className="dsh-skin-thumb" src={item.url} alt={item.name} />
                    {active && <span className="dsh-skin-badge">{t('active')}</span>}
                    <div className="dsh-skin-card-body">
                      <span className="dsh-skin-name" title={item.name}>{item.name}</span>
                      {!active && <button className="dsh-skin-button" type="button" onClick={() => { controller.select(item.id) }}>{t('use')}</button>}
                      <button className="dsh-skin-button dsh-skin-button-danger" type="button" onClick={() => { void controller.remove(item.id) }}>{t('remove')}</button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

      <label className="dsh-skin-toggle">
        <input type="checkbox" checked={state.enabled} onChange={(event) => { controller.setEnabled(event.target.checked) }} />
        <span className="dsh-skin-toggle-copy">
          <span>{t('enabled')}</span>
          <small className="dsh-skin-hint">{t('enabledHint')}</small>
        </span>
      </label>

      <div className="dsh-skin-controls">
        <label className="dsh-skin-control">
          <span className="dsh-skin-control-head"><span>{t('fit')}</span></span>
          <select value={state.fit} onChange={(event) => { controller.setFit(event.target.value as ImageFit) }}>
            <option value="cover">{t('cover')}</option>
            <option value="contain">{t('contain')}</option>
            <option value="fill">{t('stretch')}</option>
          </select>
        </label>
        <label className="dsh-skin-control">
          <span className="dsh-skin-control-head"><span>{t('position')}</span></span>
          <select value={state.position} onChange={(event) => { controller.setPosition(event.target.value as ImagePosition) }}>
            <option value="center">{t('center')}</option>
            <option value="top">{t('top')}</option>
            <option value="bottom">{t('bottom')}</option>
          </select>
        </label>
        <label className="dsh-skin-control">
          <span className="dsh-skin-control-head"><span>{t('dim')}</span><output>{state.dim}%</output></span>
          <input type="range" min="0" max="75" value={state.dim} onChange={(event) => { controller.setDim(event.target.valueAsNumber) }} />
        </label>
        <label className="dsh-skin-control">
          <span className="dsh-skin-control-head"><span>{t('blur')}</span><output>{state.blur}px</output></span>
          <input type="range" min="0" max="24" value={state.blur} onChange={(event) => { controller.setBlur(event.target.valueAsNumber) }} />
        </label>
        <label className="dsh-skin-control">
          <span className="dsh-skin-control-head"><span>{t('surface')}</span><output>{state.surface}%</output></span>
          <input type="range" min="10" max="96" value={state.surface} onChange={(event) => { controller.setSurface(event.target.valueAsNumber) }} />
        </label>
      </div>

      <div className="dsh-skin-actions">
        <button className="dsh-skin-button" type="button" onClick={() => { controller.reset() }}>{t('reset')}</button>
        {state.wallpapers.length > 0 && (
          <button className="dsh-skin-button dsh-skin-button-danger" type="button" onClick={() => { void controller.clear() }}>{t('clear')}</button>
        )}
      </div>
    </section>
  )
}
