import { test } from './util'

import { keyValues, items } from '../src'

interface IPerson {
  name: string
  country: string
}

const jackie: IPerson = {
  name: 'jackie',
  country: 'usa',
}

test('keyValues#to<object>', expect => {
  const result = keyValues(jackie).to<IPerson>({}, (person, [key, value]) => ({
    ...person,
    [key]: value.toUpperCase(),
  }))

  expect(result.name, 'JACKIE')
  expect(result.country, 'USA')
})

test('keyValues#toArray', expect => {
  const result = keyValues(jackie).to([], (acc, [key, country]) => [
    ...acc,
    key.toUpperCase(),
  ])

  items(['NAME', 'COUNTRY']).each((value, index) => {
    expect(result[index], value)
  })
})

test('keyValues#toArray (use values)', expect => {
  const result = keyValues(jackie).to([], (acc, [key, value]) => [
    ...acc,
    value,
  ])

  items(['jackie', 'usa']).each((value, index) => {
    expect(result[index], value)
  })
})

test('keyValues#to<string>', expect => {
  const result = keyValues({
    apples: 45,
    oranges: 55,
  }).to('', (acc, [key, value]) =>
    acc === '' ? `${key}:${value}` : `${acc}, ${key}:${value}`,
  )

  expect(result, 'apples:45, oranges:55')
})
