/**
 * Use `defined` to determine whether or not a value is defined
 */
export const defined = <T>(value: T | undefined) => typeof value !== 'undefined'
