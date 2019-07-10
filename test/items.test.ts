import { test } from './util'

import { defaultValue, items } from '../src'

interface IPerson {
  age: number
  name: string
  country: string
}

const jackie: IPerson = {
  age: 22,
  name: 'jackie',
  country: 'usa',
}

const marcy: IPerson = {
  age: 28,
  name: 'marcy',
  country: 'canada',
}

const people = [jackie, marcy, marcy]

test('items#to<array>', expect => {
  const result = items(people).to([], (output, person) => [
    ...output,
    person.country,
  ])

  expect(result[0], jackie.country)
  expect(result[1], marcy.country)
})

test('items#to<object> (transform)', expect => {
  const result = items(people).to<{ [name: string]: string }>(
    {},
    (output, person) => ({
      ...output,
      [person.name]: person.country,
    }),
  )

  expect(result.jackie, jackie.country)
  expect(result.marcy, marcy.country)
})

test('items#to<object> (counter)', expect => {
  const result = items(people).to<{ [country: string]: number }>(
    {},
    (summary, person) => ({
      ...summary,
      [person.country]: defaultValue(summary[person.country], 0) + 1,
    }),
  )

  expect(result.usa, 1)
  expect(result.canada, 2)
})

test('items#to<number>', expect => {
  const result = items(people).to(0, count => count + 1)

  expect(result, 3)
})

test('items#to<number> (use value)', expect => {
  const result = items(people).to(0, (count, person) => count + person.age)

  expect(result, 78)
})

test('items#sum', expect => {
  const result = items(people).sum(person => person.age)

  expect(result, 78)
})

test('items#count', expect => {
  const result = items(people).count(person => person.age === 28)

  expect(result, 2)
})

test('items#to<string>', expect => {
  const result = items(people).to(
    '',
    (value, person) =>
      `${value}${value.length ? ', ' : ''}${person.name.toUpperCase()}`,
  )

  expect(result, 'JACKIE, MARCY, MARCY')
})
