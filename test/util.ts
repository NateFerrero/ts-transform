let suite = 0

export const test = (
  desc: string,
  run: (expect: <T>(a: T, b: T) => void) => void,
) => {
  const expect = <T>(a: T, b: T) => {
    if (a !== b) {
      throw new Error(`[${suite}] Test ${desc} fail: ${a} !== ${b}`)
    }
  }

  run(expect)

  console.log(`[${suite}] Test ${desc} pass!`)
  suite++
}
