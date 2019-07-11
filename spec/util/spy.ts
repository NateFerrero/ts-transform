export const spy = (): [(...args: any[]) => void, any[][]] => {
  const calls: any[][] = []

  const spyImplementation = (...args: any[]) => {
    calls.push(args)
  }

  return [spyImplementation, calls]
}
