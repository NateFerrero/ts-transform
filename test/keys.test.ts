import { test } from './util'

import { keys, items } from '../src'

interface IPerson {
  name: string
  country: string
}

const jackie: IPerson = {
  name: 'jackie',
  country: 'usa',
}

test('keys#toObject', expect => {
  const result = keys(jackie).toObject<IPerson>((key, value) => ({
    [key]: value.toUpperCase(),
  }))

  expect(result.name, 'JACKIE')
  expect(result.country, 'USA')
})

test('keys#toArray', expect => {
  const result = keys(jackie).toArray(key => key.toUpperCase())

  items(['NAME', 'COUNTRY']).each((value, index) => {
    expect(result[index], value)
  })
})

test('keys#toArray (use values)', expect => {
  const result = keys(jackie).toArray((_key, value) => value)

  items(['jackie', 'usa']).each((value, index) => {
    expect(result[index], value)
  })
})

test('keys#toNumber', expect => {
  const result = keys({
    apples: 45,
    oranges: 55,
  }).toNumber((_key, value) => value * 2)

  expect(result, 200)
})
