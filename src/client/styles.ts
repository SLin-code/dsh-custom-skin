/** Plugin-owned global stylesheet. */

export const GLOBAL_STYLES = String.raw`
body[data-dsh-custom-skin='on'] {
  background: var(--dsh-skin-fallback, #dce7f1);
}

body[data-dsh-custom-skin='on']::before,
body[data-dsh-custom-skin='on']::after {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  content: '';
}

body[data-dsh-custom-skin='on']::before {
  inset: calc(var(--dsh-skin-blur, 0px) * -1.5);
  background-image: var(--dsh-skin-image);
  background-position: var(--dsh-skin-position, center);
  background-repeat: no-repeat;
  background-size: var(--dsh-skin-fit, cover);
  filter: blur(var(--dsh-skin-blur, 0px));
  transform: scale(1.015);
}

body[data-dsh-custom-skin='on']::after {
  background: rgb(0 0 0 / var(--dsh-skin-dim, 0.12));
}

body[data-dsh-custom-skin='on'] #root {
  position: relative;
  z-index: 1;
  background: transparent;
}

.dsh-skin-section {
  display: flex;
  max-width: 760px;
  flex-direction: column;
  gap: 20px;
  color: var(--dsw-alias-label-primary);
}

.dsh-skin-section h2,
.dsh-skin-section p { margin: 0; }
.dsh-skin-section h2 { font-size: 18px; font-weight: 600; }
.dsh-skin-intro, .dsh-skin-hint { color: var(--dsw-alias-label-tertiary); font-size: 13px; line-height: 1.55; }
.dsh-skin-error { color: var(--dsw-alias-state-error-primary); font-size: 13px; }

.dsh-skin-drop {
  display: flex;
  min-height: 96px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
  padding: 18px;
  border: 1px dashed var(--dsw-alias-border-l3);
  border-radius: 16px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-3) 70%, transparent);
  cursor: pointer;
  text-align: center;
}
.dsh-skin-drop:hover, .dsh-skin-drop[data-dragging='true'] { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dsh-skin-drop[data-disabled='true'] { cursor: wait; opacity: 0.65; }
.dsh-skin-drop strong { font-size: 14px; font-weight: 550; }
.dsh-skin-drop input { display: none; }

.dsh-skin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}
.dsh-skin-card {
  position: relative;
  overflow: hidden;
  min-width: 0;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 14px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 75%, transparent);
}
.dsh-skin-card[data-active='true'] { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary); }
.dsh-skin-thumb { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; background: var(--dsw-alias-bg-module-platform); }
.dsh-skin-card-body { display: flex; align-items: center; gap: 6px; padding: 8px; }
.dsh-skin-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.dsh-skin-badge { position: absolute; top: 8px; left: 8px; padding: 3px 8px; border-radius: 999px; background: rgb(0 0 0 / 0.62); color: white; font-size: 11px; }

.dsh-skin-button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  padding: 5px 9px;
  background: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.dsh-skin-button:hover { background: var(--dsw-alias-interactive-bg-hover-solid); }
.dsh-skin-button-danger { color: var(--dsw-alias-state-error-primary); }

.dsh-skin-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; }
.dsh-skin-control { display: flex; min-width: 0; flex-direction: column; gap: 7px; }
.dsh-skin-control-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px; }
.dsh-skin-control output { color: var(--dsw-alias-label-tertiary); font-variant-numeric: tabular-nums; }
.dsh-skin-control select {
  height: 34px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  padding: 0 10px;
  background: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  font: inherit;
}
.dsh-skin-control input[type='range'] { width: 100%; accent-color: var(--dsw-alias-brand-primary); }
.dsh-skin-toggle { display: flex; align-items: center; gap: 10px; }
.dsh-skin-toggle input { width: 18px; height: 18px; accent-color: var(--dsw-alias-brand-primary); }
.dsh-skin-toggle-copy { display: flex; flex-direction: column; gap: 2px; }
.dsh-skin-toggle-copy span { font-size: 13px; }

.dsh-skin-actions { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 4px; border-top: 1px solid var(--dsw-alias-border-l2); }

@media (max-width: 700px) {
  .dsh-skin-controls { grid-template-columns: 1fr; }
  .dsh-skin-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (prefers-reduced-motion: reduce) {
  body[data-dsh-custom-skin='on']::before { filter: none; }
}
`

/** Install the stylesheet and remove it with the plugin fiber. */
export function installStyles(): () => void {
  const tag = document.createElement('style')
  tag.dataset.plugin = 'dsh-custom-skin'
  tag.textContent = GLOBAL_STYLES
  document.head.append(tag)
  return () => { tag.remove() }
}
