export const _to = <T>(array: T[]) => <V>(
  initialValue: V | Partial<V>,
  reducer: (result: V | Partial<V>, value: T, index: number) => V | Partial<V>,
): V => array.reduce(reducer, initialValue) as V
