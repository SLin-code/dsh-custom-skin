import { IDBFactory } from 'fake-indexeddb'
import { beforeEach, describe, expect, it } from 'vitest'
import { SkinController } from '../src/client/skin-controller.ts'

describe('SkinController', () => {
  beforeEach(() => {
    localStorage.clear()
    Object.defineProperty(globalThis, 'indexedDB', {
      configurable: true,
      value: new IDBFactory(),
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
})
