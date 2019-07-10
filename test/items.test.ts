import { test } from './util'

import { defaultValue, items } from '../src'

interface IPerson {
  name: string
  country: string
}

const jackie: IPerson = {
  name: 'jackie',
  country: 'usa',
}

const marcy: IPerson = {
  name: 'marcy',
  country: 'canada',
}

const people = [jackie, marcy, marcy]

test('items#toArray', expect => {
  const result = items(people).toArray(person => person.country)

  expect(result[0], jackie.country)
  expect(result[1], marcy.country)
})

test('items#toObject (transform)', expect => {
  const result = items(people).toObject(person => ({
    [person.name]: person.country,
  }))

  expect(result.jackie, jackie.country)
  expect(result.marcy, marcy.country)
})

test('items#toObject (counter)', expect => {
  const result = items(people).toObject<{ [country: string]: number }>(
    (person, summary) => ({
      [person.country]: defaultValue(summary[person.country], 0) + 1,
    }),
  )

  expect(result.usa, 1)
  expect(result.canada, 2)
})

test('items#toNumber', expect => {
  const result = items(people).toNumber(() => 1)

  expect(result, 3)
})

test('items#toString', expect => {
  const result = items(people).toString(
    (person, value) =>
      `${value}${value.length ? ', ' : ''}${person.name.toUpperCase()}`,
  )

  expect(result, 'JACKIE, MARCY, MARCY')
})
