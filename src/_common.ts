import { _count } from './_count'
import { _each } from './_each'
import { _sum } from './_sum'
import { _to } from './_to'

export const _common = <T>(value: T[]) => {
  const to = _to<T>(value)

  return {
    count: _count<T>(to),
    each: _each<T>(to),
    sum: _sum<T>(to),
    to,
  }
}
