import { To } from '../types/To'

export const _object = <T>(to: To<T>) => <V extends object>(
  action: (value: T, index: number, result: Partial<V>) => V | Partial<V>,
) =>
  to<V | Partial<V>>({}, (result, value, index) => ({
    ...result,
    ...action(value, index, result),
  })) as V
