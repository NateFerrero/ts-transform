export const _array = <T>(
  to: <U>(
    initialValue: U[],
    reducer: (result: U[], item: T, index: number) => U[],
  ) => U[],
) => <V>(action: (value: T, index: number) => V) =>
  to<V>([], (result, value: T, index) => [...result, action(value, index)])
