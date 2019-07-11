import { To } from '../types/To'

export const _sum = <T>(to: To<T>) => (reducer: (value: T) => number) =>
  to<number>(0, (result, value: T) => result + reducer(value))
