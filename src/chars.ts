import { _common } from './_common'

/**
 * Use `chars` to transform characters in a string
 */
export const chars = (string: string) => _common<string>(string.split(''))
