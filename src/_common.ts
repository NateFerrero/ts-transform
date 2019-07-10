import { _array } from './_array'
import { _count } from './_count'
import { _each } from './_each'
import { _object } from './_object'
import { _sum } from './_sum'
import { _to } from './_to'

export const _common = <T>(value: T[]) => {
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
