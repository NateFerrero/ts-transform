import { defined } from './defined'

export const defaultValue = <T>(value: T | undefined, fallbackValue: T) =>
  defined(value) ? value : fallbackValue
