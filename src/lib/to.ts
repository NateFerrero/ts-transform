import { To } from '../types/To'

export const _to = <T>(array: T[]): To<T> => <V, W extends V>(
  initialValue: V,
  reducer: (result: V, value: T, index: number) => V,
): W => array.reduce(reducer, initialValue) as W
