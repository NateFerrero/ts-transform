let suiteCounter = 0

export type Expect = <T>(a: T, b: T) => void

export type Test = (desc: string, run: (expect: Expect) => void) => void

export const test: Test = (desc: string, run: (expect: Expect) => void) => {
  const expect = <T>(a: T, b: T) => {
    if (a !== b) {
      throw new Error(`[${suiteCounter}] Test ${desc} fail: ${a} !== ${b}`)
    }
  }

  run(expect)

  console.log(`[${suiteCounter}] Test ${desc} pass!`)
  suiteCounter++
}

export const suite = (name: string, tests: (test: Test) => void) => {
  tests((desc, run) => test(`${name} ${desc}`, run))
}
