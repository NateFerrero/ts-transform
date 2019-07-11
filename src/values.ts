import { _transform } from './lib/transform'

/**
 * Use `values` to transform values in an object
 */
export const values = <T extends object>(object: T) =>
  _transform<T[keyof T]>(
    Object.keys(object).map(key => (object as { [key: string]: never })[key]),
  )
