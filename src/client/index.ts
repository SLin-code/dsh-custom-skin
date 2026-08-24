/** DSH browser plugin entry: wallpaper runtime plus a Settings section. */

import type { ClientContext } from './contracts.ts'
import { en, zh } from './locales.ts'
import { SkinController } from './skin-controller.ts'
import { SkinSection } from './SkinSection.tsx'
import { installStyles } from './styles.ts'

const NS = 'dsh.custom-skin'

/** Client services required before registration. */
export const inject = ['slots', 'locale']

/** Register the settings page and begin restoring this browser's wallpaper. */
export function apply(ctx: ClientContext): void {
  const controller = new SkinController()
  const t = ctx.locale.bind(NS)
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-custom-skin: dictionaries')
  ctx.effect(() => installStyles(), 'dsh-custom-skin: global styles')
  ctx.effect(() => {
    void controller.initialize()
    return () => { controller.dispose() }
  }, 'dsh-custom-skin: local wallpaper runtime')
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'custom-skin',
    order: 12,
    label: () => t('nav'),
    locale: NS,
    inject: () => ({ controller, hooks: { skin: controller } }),
  }, SkinSection))
}
