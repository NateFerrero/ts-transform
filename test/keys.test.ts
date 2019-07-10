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

test('keys#to<object>', expect => {
  const result = keys(jackie).to<IPerson>({}, (person, key) => ({
    ...person,
    [key]: key.toUpperCase(),
  }))

  expect(result.name, 'NAME')
  expect(result.country, 'COUNTRY')
})

test('keys#toArray', expect => {
  const result = keys(jackie).to([], (acc, key) => [...acc, key.toUpperCase()])

  items(['NAME', 'COUNTRY']).each((value, index) => {
    expect(result[index], value)
  })
})

test('keys#toArray (use values)', expect => {
  const result = keys(jackie).to([], (acc, key) => [...acc, key])

  items(['name', 'country']).each((value, index) => {
    expect(result[index], value)
  })
})

test('keys#to<string>', expect => {
  const result = keys({
    apples: 45,
    oranges: 55,
  }).to('', (acc, key) => (acc === '' ? key : `${acc}, ${key}`))

  expect(result, 'apples, oranges')
})
