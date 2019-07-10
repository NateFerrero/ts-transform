import { _common } from './_common'

/**
 * Use `keys` to transform keys in an object
 */
export const keys = <T extends object>(object: T) =>
  _common(Object.keys(object))
