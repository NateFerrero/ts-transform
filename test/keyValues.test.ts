import { suite } from './util'

import { keyValues, items } from '../src'

interface IPerson {
  name: string
  country: string
}

const jackie: IPerson = {
  name: 'jackie',
  country: 'usa',
}

suite('keyValues', test => {
  test('#to<object>', expect => {
    const result = keyValues(jackie).to<IPerson>(
      {},
      (person, [key, value]) => ({
        ...person,
        [key]: value.toUpperCase(),
      }),
    )

    expect(result.name, 'JACKIE')
    expect(result.country, 'USA')
  })

  test('#toArray', expect => {
    const result = keyValues(jackie).to([], (acc, [key, country]) => [
      ...acc,
      key.toUpperCase(),
    ])

    items(['NAME', 'COUNTRY']).each((value, index) => {
      expect(result[index], value)
    })
  })

  test('#toArray (use values)', expect => {
    const result = keyValues(jackie).to([], (acc, [key, value]) => [
      ...acc,
      value,
    ])

    items(['jackie', 'usa']).each((value, index) => {
      expect(result[index], value)
    })
  })

  test('#to<string>', expect => {
    const result = keyValues({
      apples: 45,
      oranges: 55,
    }).to('', (acc, [key, value]) =>
      acc === '' ? `${key}:${value}` : `${acc}, ${key}:${value}`,
    )

    expect(result, 'apples:45, oranges:55')
  })
})
