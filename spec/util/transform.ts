import { Expect, Test } from './test'

interface ItransformTests {
  testArray(expect: Expect): void
  testCount(expect: Expect): void
  testEach(expect: Expect): void
  testObject(expect: Expect): void
  testSum(expect: Expect): void
  testToBoolean(expect: Expect): void
  testToNumber(expect: Expect): void
  testToString(expect: Expect): void
}

export const testTransform = (test: Test, tests: ItransformTests) => {
  test('#testArray', tests.testArray)
  test('#testCount', tests.testCount)
  test('#testEach', tests.testEach)
  test('#testObject', tests.testObject)
  test('#testSum', tests.testSum)
  test('#testToBoolean', tests.testToBoolean)
  test('#testToNumber', tests.testToNumber)
  test('#testToString', tests.testToString)
}
