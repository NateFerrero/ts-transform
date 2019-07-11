import { _transform } from './lib/transform'

/**
 * Use `chars` to transform characters in a string
 */
export const chars = (string: string) => _transform<string>(string.split(''))
