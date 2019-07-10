import { test } from './util'

import { chars } from '../src'

test('chars#count', expect => {
  const result = chars('canada').count(char => char === 'a')

  expect(result, 3)
})

test('chars#to<number>', expect => {
  const result = chars('canada').to(
    0,
    (count, char) => count + (char === 'a' ? 1 : 0),
  )

  expect(result, 3)
})

test('chars#to<string>', expect => {
  const result = chars('canada').to('', (value, char) => `${char}${value}`)

  expect(result, 'adanac')
})
