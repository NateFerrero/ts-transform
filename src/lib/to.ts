import { To } from '../types/To'

export const _to = <T>(array: T[]): To<T> => <
  TIntermediate,
  TDestination extends TIntermediate
>(
  initialValue: TIntermediate,
  reducer: (result: TIntermediate, value: T, index: number) => TIntermediate,
): TDestination => array.reduce(reducer, initialValue) as TDestination
