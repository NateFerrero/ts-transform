import { _common } from './_common'

/**
 * Use `values` to transform values in an object
 */
export const values = <T extends object>(object: T) =>
  _common(Object.keys(object).map(key => object[key]))
