import { defaultValue, items } from '../src'
import { spy } from './util/spy'
import { suite } from './util/test'
import { testTransform } from './util/transform'

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

  testTransform(test, {
    testArray(expect) {
      const names = subject.array(key => key.name)

      items(['jackie', 'marcy', 'marcy']).each((name, index) => {
        expect(names[index], name)
      })
    },

    testCount(expect) {
      const howManyAtLeastAge18 = subject.count(person => person.age >= 18)
      const howManyAtLeastAge25 = subject.count(person => person.age >= 25)

      expect(howManyAtLeastAge18, 3)
      expect(howManyAtLeastAge25, 2)
    },

    testEach(expect) {
      const [onEach, onEachCalls] = spy()

      subject.each(onEach)

      expect(onEachCalls.length, 3)

      expect(onEachCalls[0][0], jackie)
      expect(onEachCalls[1][0], marcy)
      expect(onEachCalls[2][0], marcy)
    },

    testObject(expect) {
      const keyExists = subject.object(person => ({ [person.name]: true }))

      expect(keyExists.jackie, true)
      expect(keyExists.marcy, true)
      expect(keyExists.phillip, undefined)

      const keyCounts = subject.object<{ [key: string]: number }>(
        (person, index, totals) => ({
          [person.name]: defaultValue(totals[person.name], 0) + 1,
        }),
      )

      expect(keyCounts.jackie, 1)
      expect(keyCounts.marcy, 2)
      expect(keyCounts.phillip, undefined)
    },

    testSum(expect) {
      const sumAges = subject.sum(person => person.age)

      expect(sumAges, 78)
    },

    testToBoolean(expect) {
      const allAtLeastAge18 = subject.to(
        true,
        (value, person) => value && person.age >= 18,
      )

      const allAtLeastAge25 = subject.to(
        true,
        (value, person) => value && person.age >= 25,
      )

      expect(allAtLeastAge18, true)
      expect(allAtLeastAge25, false)
    },

    testToNumber(expect) {
      const howManyAtLeastAge18 = subject.to(
        0,
        (count, person) => count + (person.age >= 18 ? 1 : 0),
      )

      const howManyAtLeastAge25 = subject.to(
        0,
        (count, person) => count + (person.age >= 25 ? 1 : 0),
      )

      expect(howManyAtLeastAge18, 3)
      expect(howManyAtLeastAge25, 2)
    },

    testToString(expect) {
      const glued = subject.to('', (value, person) => `${value}:${person.name}`)

      expect(glued, ':jackie:marcy:marcy')
    },
  })
})
