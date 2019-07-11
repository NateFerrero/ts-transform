import { To } from '../types/To'

export const _array = <T>(to: To<T>) => <U>(
  action: (value: T, index: number) => U,
) => to<U[]>([], (result, value: T, index) => [...result, action(value, index)])
