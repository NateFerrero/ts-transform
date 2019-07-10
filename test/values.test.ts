import { test } from './util'

import { values } from '../src'

test('values#to<number>', expect => {
  const result = values({
    apples: 45,
    oranges: 55,
  }).to(0, (total, value) => total + value * 2)

  expect(result, 200)
})
