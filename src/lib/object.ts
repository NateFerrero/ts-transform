import { To } from '../types/To'

export const _object = <T>(to: To<T>) => <TDestination extends object>(
  action: (
    value: T,
    index: number,
    result: Partial<TDestination>,
  ) => TDestination | Partial<TDestination>,
) =>
  to<TDestination | Partial<TDestination>>({}, (result, value, index) => ({
    ...result,
    ...action(value, index, result),
  })) as TDestination
