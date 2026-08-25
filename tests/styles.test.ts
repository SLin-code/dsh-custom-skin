import { describe, expect, it } from 'vitest'
import { GLOBAL_STYLES } from '../src/client/styles.ts'

describe('wallpaper settings styles', () => {
  it('keeps the file picker keyboard focusable', () => {
    expect(GLOBAL_STYLES).toContain('.dsh-skin-drop:focus-within')
    expect(GLOBAL_STYLES).toContain('clip-path: inset(50%)')
    expect(GLOBAL_STYLES).not.toContain('.dsh-skin-drop input { display: none; }')
  })
})
