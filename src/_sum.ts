export const _sum = <T>(
  to: (
    initialValue: number,
    reducer: (result: number, item: T, index: number) => number,
  ) => number,
) => (reducer: (value: T) => number) =>
  to(0, (result, value: T) => result + reducer(value))
