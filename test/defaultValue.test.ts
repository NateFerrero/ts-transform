import { test } from './util'

import { defaultValue } from '../src'

test('defaultValue(defined)', expect => {
  const result = defaultValue(1, 2)

  expect(result, 1)
})

test('defaultValue(undefined)', expect => {
  const result = defaultValue(undefined, 2)

  expect(result, 2)
})
