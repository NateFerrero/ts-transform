import { suite } from './util'

import { defined } from '../src'

suite('defined', test => {
  test('when defined', expect => {
    const result = defined(1)

    expect(result, true)
  })

  test('when undefined', expect => {
    const result = defined(undefined)

    expect(result, false)
  })
})
