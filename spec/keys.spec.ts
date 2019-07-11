import { defaultValue, items, keys } from '../src'
import { spy } from './util/spy'
import { suite } from './util/test'
import { testTransform } from './util/transform'

suite('keys', test => {
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

  const subject = keys(jackie)

  testTransform(test, {
    testArray(expect) {
      const newKeys = subject.array(key => key.toUpperCase())

      items(['AGE', 'NAME', 'COUNTRY']).each((newKey, index) => {
        expect(newKeys[index], newKey)
      })
    },

    testCount(expect) {
      const howManyAgeKeys = subject.count(key => key === 'age')

      expect(howManyAgeKeys, 1)
    },

    testEach(expect) {
      const [onEach, onEachCalls] = spy()

      subject.each(onEach)

      expect(onEachCalls.length, 3)

      expect(onEachCalls[0][0], 'age')
      expect(onEachCalls[1][0], 'name')
      expect(onEachCalls[2][0], 'country')
    },

    testObject(expect) {
      const keyExists = subject.object(key => ({ [key]: true }))

      expect(keyExists.age, true)
      expect(keyExists.name, true)
      expect(keyExists.country, true)
      expect(keyExists.mascot, undefined)

      const keyCounts = subject.object<{ [key: string]: number }>(
        (key, index, totals) => ({
          [key]: defaultValue(totals[key], 0) + 1,
        }),
      )

      expect(keyCounts.age, 1)
      expect(keyCounts.name, 1)
      expect(keyCounts.country, 1)
      expect(keyCounts.mascot, undefined)
    },

    testSum(expect) {
      const sumKeyLengths = subject.sum(key => key.length)

      expect(sumKeyLengths, 14)
    },

    testToBoolean(expect) {
      const allKeysAtLeast3Long = subject.to(
        true,
        (value, key) => value && key.length >= 3,
      )

      const allKeysAtLeast5Long = subject.to(
        true,
        (value, key) => value && key.length >= 5,
      )

      expect(allKeysAtLeast3Long, true)
      expect(allKeysAtLeast5Long, false)
    },

    testToNumber(expect) {
      const howManyKeysAtLeast3Long = subject.to(
        0,
        (count, key) => count + (key.length >= 3 ? 1 : 0),
      )

      const howManyKeysAtLeast5Long = subject.to(
        0,
        (count, key) => count + (key.length >= 5 ? 1 : 0),
      )

      expect(howManyKeysAtLeast3Long, 3)
      expect(howManyKeysAtLeast5Long, 1)
    },

    testToString(expect) {
      const glued = subject.to('', (value, key) => `${value}:${key}`)

      expect(glued, ':age:name:country')
    },
  })
})
