import { suite } from './util'

import { items, defaultValue } from '../src'
import { common } from './common'

suite('items', test => {
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

  const subject = items([jackie, marcy, marcy])

  common(test, {
    testArray(expect) {
      const tenYearsLater = subject.array(person => ({
        ...person,
        age: person.age + 10,
      }))

      items([32, 38, 38]).each((newAge, index) => {
        expect(tenYearsLater[index].age, newAge)
      })
    },

    testCount(expect) {
      const howManyMarcy = subject.count(person => person.name === 'marcy')

      expect(howManyMarcy, 2)
    },

    testEach(expect) {},

    testObject(expect) {
      const nameExists = subject.object(person => ({ [person.name]: true }))

      expect(nameExists.marcy, true)
      expect(nameExists.jackie, true)
      expect(nameExists.phillip, undefined)

      const nameCounts = subject.object<{ [key: string]: number }>(
        (person, index, totals) => ({
          [person.name]: defaultValue(totals[person.name], 0) + 1,
        }),
      )

      expect(nameCounts.marcy, 2)
      expect(nameCounts.jackie, 1)
      expect(nameCounts.phillip, undefined)
    },

    testSum(expect) {
      const sumAges = subject.sum(person => person.age)

      expect(sumAges, 78)
    },

    testToBoolean(expect) {
      const allPeopleAreOver18 = subject.to(
        true,
        (value, person) => value && person.age >= 18,
      )
      const allPeopleAreOver25 = subject.to(
        true,
        (value, person) => value && person.age >= 25,
      )

      expect(allPeopleAreOver18, true)
      expect(allPeopleAreOver25, false)
    },

    testToNumber(expect) {
      const howManyOverAge25 = subject.to(
        0,
        (count, person) => count + (person.age >= 25 ? 1 : 0),
      )

      expect(howManyOverAge25, 2)
    },

    testToString(expect) {
      const glued = subject.to('', (value, person) => `${value}:${person.name}`)

      expect(glued, ':jackie:marcy:marcy')
    },
  })
})
