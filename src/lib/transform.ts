import { _array } from './array'
import { _count } from './count'
import { _each } from './each'
import { _object } from './object'
import { _sum } from './sum'
import { _to } from './to'

export const _transform = <T>(value: T[]) => {
  const to = _to<T>(value)

  return {
    array: _array<T>(to),
    count: _count<T>(to),
    each: _each<T>(to),
    object: _object<T>(to),
    sum: _sum<T>(to),
    to,
  }
}
