import { test } from './util'

import { defined } from '../src'

test('defined(defined)', expect => {
  const result = defined(1)

  expect(result, true)
})

test('defined(undefined)', expect => {
  const result = defined(undefined)

  expect(result, false)
})
