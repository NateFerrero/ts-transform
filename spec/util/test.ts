let suiteCounter = 0

export type Expect = <T>(a: T, b: T) => void

export type Test = (desc: string, run: (expect: Expect) => void) => void

const logMessages: string[] = []
const log = (message: string) => logMessages.push(message)

const flush = (display: boolean = true) => {
  if (display) {
    logMessages.forEach(message => console.log(message))
  }
  logMessages.length = 0
}

export const test: Test = (desc: string, run: (expect: Expect) => void) => {
  const expect = <T>(a: T, b: T) => {
    if (a !== b) {
      flush()
      console.log('')
      console.log(`🛑 Test #${suiteCounter} » ${desc}`)
      console.log('')
      console.log('🤬  Found:')
      console.log('')
      console.dir(a)
      console.log('')
      console.log('👉 Was expecting:')
      console.log('')
      console.dir(b)
      console.log('')
      throw new Error(
        `🛑 FAIL » test #${suiteCounter} » ${desc}: ${a} !== ${b}`,
      )
    }
  }

  try {
    run(expect)
    log(`☀️  PASS » test #${suiteCounter} » ${desc}`)
    suiteCounter++
  } catch (e) {
    console.log(
      e.stack
        .split('\n')
        .slice(1)
        .join('\n'),
    )
    process.exit()
  }
}

export const suite = (name: string, tests: (test: Test) => void) => {
  const initSuiteCounter = suiteCounter
  tests((desc, run) => test(`${name} ${desc}`, run))
  flush(false)
  console.log(
    `☀️  PASS » tests #${initSuiteCounter}-#${suiteCounter - 1} “${name}”`,
  )
}

const hrStart = process.hrtime()

setImmediate(() => {
  console.log('')
  const hrEnd = process.hrtime(hrStart)
  console.info(
    '✅ Successfully completed with duration: %ds %dms',
    hrEnd[0],
    Math.floor(hrEnd[1] / 1000) / 1000,
  )
  process.exit()
})
