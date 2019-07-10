import { test } from './util'

import { chars } from '../src'

test('chars#toNumber', expect => {
  const result = chars('canada').toNumber(char => char === 'a')

  expect(result, 3)
})
