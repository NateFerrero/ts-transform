import { _transform } from './lib/transform'

/**
 * Use `keyValues` to transform keys and values in an object
 */
export const keyValues = <T extends object>(object: T) =>
  _transform<[keyof T, T[keyof T]]>(
    Object.keys(object).map<[keyof T, T[keyof T]]>(key => [
      key as keyof T,
      (object as { [key: string]: never })[key],
    ]),
  )
