import { test } from './util'

import { values } from '../src'

test('values#toNumber', expect => {
  const result = values({
    apples: 45,
    oranges: 55,
  }).toNumber(value => value * 2)

  expect(result, 200)
})
