/** Small structural types used to stay independent of unpublished DSH client typings. */

import type { ComponentType } from 'react'
import type { SkinController, SkinSnapshot } from './skin-controller.ts'

export type Translate = (key: LocaleKey) => string

export type SnapshotSelector = <Selection>(
  selector: (snapshot: SkinSnapshot) => Selection,
  equals?: (left: Selection, right: Selection) => boolean,
) => Selection

export interface SkinSectionProps {
  t: Translate
  useSkin: SnapshotSelector
  controller: SkinController
  close: () => void
}

export interface ClientContext {
  locale: {
    register: (namespace: string, dictionaries: { zh: LocaleTable; en: LocaleTable }) => () => void
    bind: (namespace: string) => Translate
  }
  slots: {
    inject: (name: string, setup: () => () => void) => void
    register: (
      options: {
        name: string
        id: string
        order: number
        label: () => string
        locale: string
        inject: () => { controller: SkinController; hooks: { skin: SkinController } }
      },
      component: ComponentType<SkinSectionProps>,
    ) => () => void
  }
  effect: (setup: () => void | (() => void), label?: string) => void
}

export type LocaleKey = keyof typeof import('./locales.ts').en
export type LocaleTable = Record<LocaleKey, string>
