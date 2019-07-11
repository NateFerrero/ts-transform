import { To } from '../types/To'

export const _array = <T>(to: To<T>) => <TDestination>(
  action: (value: T, index: number) => TDestination,
) => to<TDestination[]>([], (result, value: T, index) => [...result, action(value, index)])
