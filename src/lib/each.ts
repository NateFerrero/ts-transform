import { To } from '../types/To'

export const _each = <T>(to: To<T>) => (
  action: (value: T, index: number) => void,
) =>
  to<void>(undefined, (result, value: T, index) => {
    action(value, index)
  })
