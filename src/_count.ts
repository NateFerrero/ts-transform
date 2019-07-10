export const _count = <T>(
  to: (
    initialValue: number,
    reducer: (result: number, item: T, index: number) => number,
  ) => number,
) => (reducer: (value: T) => boolean) =>
  to(0, (result, value: T) => result + Number(reducer(value)))
