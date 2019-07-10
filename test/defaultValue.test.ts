import { suite } from './util'

import { defaultValue } from '../src'

suite('defaultValue', test => {
  test('when defined', expect => {
    const result = defaultValue(1, 2)

    expect(result, 1)
  })

  test('when undefined', expect => {
    const result = defaultValue(undefined, 2)

    expect(result, 2)
  })
})
