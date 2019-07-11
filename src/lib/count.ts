import { To } from '../types/To'

export const _count = <T>(to: To<T>) => (reducer: (value: T) => boolean) =>
  to<number>(0, (result, value: T) => result + Number(reducer(value)))
