export type To<T> = <U>(
  initialValue: U,
  reducer: (result: U, item: T, index: number) => U,
) => U
