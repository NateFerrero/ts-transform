export const _object = <T>(
  to: <U extends object>(
    initialValue: Partial<U>,
    reducer: (result: Partial<U>, item: T, index: number) => Partial<U>,
  ) => U,
) => <V extends object>(
  action: (value: T, index: number, result: Partial<V>) => V | Partial<V>,
) =>
  to<V>({}, (result, value, index) => ({
    ...result,
    ...action(value, index, result),
  }))
