import { suite } from './util'

import { values, items } from '../src'

interface IPerson {
  name: string
  country: string
}

const jackie: IPerson = {
  name: 'jackie',
  country: 'usa',
}

suite('values', test => {
  test('#to<object>', expect => {
    const result = values(jackie).to<{ jackie: string; usa: string }>(
      {},
      (person, value) => ({
        ...person,
        [value.toLowerCase()]: value.toUpperCase(),
      }),
    )

    expect(result.jackie, 'JACKIE')
    expect(result.usa, 'USA')
  })

  test('#toArray', expect => {
    const result = values(jackie).to([], (acc, value) => [
      ...acc,
      value.toUpperCase(),
    ])

    items(['JACKIE', 'USA']).each((value, index) => {
      expect(result[index], value)
    })
  })

  test('#to<string>', expect => {
    const result = values({
      apples: 45,
      oranges: 55,
    }).to('', (acc, value) => (acc === '' ? `${value}` : `${acc}, ${value}`))

    expect(result, '45, 55')
  })
})
