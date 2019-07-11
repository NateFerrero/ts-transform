import { chars, defaultValue, items } from '../src'
import { spy } from './util/spy'
import { suite } from './util/test'
import { testTransform } from './util/transform'

suite('chars', test => {
  const subject = chars('canada')

  testTransform(test, {
    testArray(expect) {
      const split = subject.array(char => char)

      items(['c', 'a', 'n', 'a', 'd', 'a']).each((char, index) => {
        expect(split[index], char)
      })
    },

    testCount(expect) {
      const resultA = subject.count(char => char === 'a')
      const resultZ = subject.count(char => char === 'z')

      expect(resultA, 3)
      expect(resultZ, 0)
    },

    testEach(expect) {
      const [onEach, onEachCalls] = spy()

      subject.each(onEach)

      expect(onEachCalls.length, 6)
      expect(onEachCalls[0][0], 'c')
      expect(onEachCalls[1][0], 'a')
      expect(onEachCalls[2][0], 'n')
      expect(onEachCalls[3][0], 'a')
      expect(onEachCalls[4][0], 'd')
      expect(onEachCalls[5][0], 'a')
    },

    testObject(expect) {
      const letterExists = subject.object(char => ({ [char]: true }))

      expect(letterExists.c, true)
      expect(letterExists.a, true)
      expect(letterExists.n, true)
      expect(letterExists.d, true)
      expect(letterExists.e, undefined)

      const letterCounts = subject.object<{ [key: string]: number }>(
        (char, index, totals) => ({
          [char]: defaultValue(totals[char], 0) + 1,
        }),
      )

      expect(letterCounts.c, 1)
      expect(letterCounts.a, 3)
      expect(letterCounts.n, 1)
      expect(letterCounts.d, 1)
      expect(letterCounts.e, undefined)
    },

    testSum(expect) {
      const sumCharCodes = subject.sum(char => char.charCodeAt(0))

      expect(sumCharCodes, 600)
    },

    testToBoolean(expect) {
      const isEvenLength = subject.to(true, value => !value)

      expect(isEvenLength, true)
    },

    testToNumber(expect) {
      const letterCounterA = subject.to(
        0,
        (count, char) => count + (char === 'a' ? 1 : 0),
      )

      expect(letterCounterA, 3)
    },

    testToString(expect) {
      const reversed = subject.to('', (value, char) => `${char}${value}`)

      expect(reversed, 'adanac')
    },
  })
})
