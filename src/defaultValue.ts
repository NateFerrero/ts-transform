import { defined } from './defined'

/**
 * Use `defaultValue` to provide a fallback value when the primary value is missing
 */
export const defaultValue = <T>(value: T | undefined, fallbackValue: T) =>
  defined(value) ? value : fallbackValue
