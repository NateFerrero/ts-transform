import { defaultValue, items, keyValues } from '../src'
import { spy } from './util/spy'
import { suite } from './util/test'
import { testTransform } from './util/transform'

suite('keyValues', test => {
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

  const subject = keyValues(jackie)

  testTransform(test, {
    testArray(expect) {
      const newKeyValues = subject.array(
        ([key, value]) => `${key}=${String(value).toUpperCase()}`,
      )

      items(['age=22', 'name=JACKIE', 'country=USA']).each(
        (newValue, index) => {
          expect(newKeyValues[index], newValue)
        },
      )
    },

    testCount(expect) {
      const howManyStringValuesAndKeysStartingWithN = subject.count(
        ([key, value]) => key[0] === 'n' && typeof value === 'string',
      )

      expect(howManyStringValuesAndKeysStartingWithN, 1)
    },

    testEach(expect) {
      const [onEach, onEachCalls] = spy()

      subject.each(onEach)

      expect(onEachCalls.length, 3)

      expect(onEachCalls[0][0][0], 'age')
      expect(onEachCalls[0][0][1], 22)
      expect(onEachCalls[1][0][0], 'name')
      expect(onEachCalls[1][0][1], 'jackie')
      expect(onEachCalls[2][0][0], 'country')
      expect(onEachCalls[2][0][1], 'usa')
    },

    testObject(expect) {
      const valueExists = subject.object(([key, value]) => ({ [value]: true }))

      expect(valueExists[22], true)
      expect(valueExists.jackie, true)
      expect(valueExists.usa, true)
      expect(valueExists.phillip, undefined)

      const valueCounts = subject.object<{ [value: string]: number }>(
        ([key, value], index, totals) => ({
          [`${key}_${value}`]: defaultValue(totals[`${key}_${value}`], 0) + 1,
        }),
      )

      expect(valueCounts.age_22, 1)
      expect(valueCounts.name_jackie, 1)
      expect(valueCounts.country_usa, 1)
      expect(valueCounts.nickname_phillip, undefined)
    },

    testSum(expect) {
      const sumValueOrStringLengths = subject.sum(([key, value]) =>
        typeof value === 'string' ? value.length : value,
      )

      expect(sumValueOrStringLengths, 31)
    },

    testToBoolean(expect) {
      const allKeysAndStringValuesAtLeast3Long = subject.to(
        true,
        (condition, [key, value]) =>
          condition &&
          key.length >= 3 &&
          (typeof value === 'string' ? value.length >= 3 : true),
      )

      const allKeysAndStringValuesAtLeast5Long = subject.to(
        true,
        (condition, [key, value]) =>
          condition &&
          key.length >= 5 &&
          (typeof value === 'string' ? value.length >= 5 : true),
      )

      expect(allKeysAndStringValuesAtLeast3Long, true)
      expect(allKeysAndStringValuesAtLeast5Long, false)
    },

    testToNumber(expect) {
      const lengthOfAllKeysAndValues = subject.to(
        0,
        (count, [key, value]) => count + (key.length + String(value).length),
      )

      expect(lengthOfAllKeysAndValues, 25)
    },

    testToString(expect) {
      const glued = subject.to(
        '',
        (acc, [key, value]) => `${acc}:${key}=${value}`,
      )

      expect(glued, ':age=22:name=jackie:country=usa')
    },
  })
})
