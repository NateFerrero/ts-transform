import { Test, Expect } from './util'

interface ICommonTests {
  testArray(expect: Expect): void
  testCount(expect: Expect): void
  testEach(expect: Expect): void
  testObject(expect: Expect): void
  testSum(expect: Expect): void
  testToBoolean(expect: Expect): void
  testToNumber(expect: Expect): void
  testToString(expect: Expect): void
}

export const common = (test: Test, tests: ICommonTests) => {
  test('#array', tests.testArray)
  test('#count', tests.testCount)
  test('#each', tests.testEach)
  test('#object', tests.testObject)
  test('#sum', tests.testSum)
  test('#to<boolean>', tests.testToBoolean)
  test('#to<number>', tests.testToNumber)
  test('#to<string>', tests.testToString)
}
