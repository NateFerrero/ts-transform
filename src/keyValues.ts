import { _common } from './_common'

/**
 * Use `keyValues` to transform keys and values in an object
 */
export const keyValues = <T extends object>(object: T) =>
  _common<[keyof T, T[keyof T]]>(
    Object.keys(object).map<[keyof T, typeof object[keyof T]]>(key => [
      key as keyof T,
      object[key],
    ]),
  )
