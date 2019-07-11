import { _transform } from './lib/transform'

/**
 * Use `items` to transform items in an array
 */
export const items = <T>(array: T[]) => _transform(array)
