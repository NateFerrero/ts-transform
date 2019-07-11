import { defaultValue, items, values } from '../src'
import { spy } from './util/spy'
import { suite } from './util/test'
import { testTransform } from './util/transform'

suite('values', test => {
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

  const subject = values(jackie)

  testTransform(test, {
    testArray(expect) {
      const newValues = subject.array(value => String(value).toUpperCase())

      items(['22', 'JACKIE', 'USA']).each((newValue, index) => {
        expect(newValues[index], newValue)
      })
    },

    testCount(expect) {
      const howManyStringValues = subject.count(
        value => typeof value === 'string',
      )

      expect(howManyStringValues, 2)
    },

    testEach(expect) {
      const [onEach, onEachCalls] = spy()

      subject.each(onEach)

      expect(onEachCalls.length, 3)

      expect(onEachCalls[0][0], 22)
      expect(onEachCalls[1][0], 'jackie')
      expect(onEachCalls[2][0], 'usa')
    },

    testObject(expect) {
      const valueExists = subject.object(value => ({ [value]: true }))

      expect(valueExists[22], true)
      expect(valueExists.jackie, true)
      expect(valueExists.usa, true)
      expect(valueExists.phillip, undefined)

      const valueCounts = subject.object<{ [value: string]: number }>(
        (value, index, totals) => ({
          [value]: defaultValue(totals[value], 0) + 1,
        }),
      )

      expect(valueCounts[22], 1)
      expect(valueCounts.jackie, 1)
      expect(valueCounts.usa, 1)
      expect(valueCounts.phillip, undefined)
    },

    testSum(expect) {
      const sumValueOrStringLengths = subject.sum(value =>
        typeof value === 'string' ? value.length : value,
      )

      expect(sumValueOrStringLengths, 31)
    },

    testToBoolean(expect) {
      const allStringValuesAtLeast3Long = subject.to(
        true,
        (condition, value) =>
          condition && (typeof value === 'string' ? value.length >= 3 : true),
      )

      const allStringValuesAtLeast5Long = subject.to(
        true,
        (condition, value) =>
          condition && (typeof value === 'string' ? value.length >= 5 : true),
      )

      expect(allStringValuesAtLeast3Long, true)
      expect(allStringValuesAtLeast5Long, false)
    },

    testToNumber(expect) {
      const howManyStrings = subject.to(
        0,
        (count, value) => count + (typeof value === 'string' ? 1 : 0),
      )

      const howManyNumbers = subject.to(
        0,
        (count, value) => count + (typeof value === 'number' ? 1 : 0),
      )

      expect(howManyStrings, 2)
      expect(howManyNumbers, 1)
    },

    testToString(expect) {
      const glued = subject.to('', (acc, value) => `${acc}:${value}`)

      expect(glued, ':22:jackie:usa')
    },
  })
})
