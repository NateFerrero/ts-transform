import { _transform } from './lib/transform'

/**
 * Use `keys` to transform keys in an object
 */
export const keys = <T extends object>(object: T) =>
  _transform(Object.keys(object))
