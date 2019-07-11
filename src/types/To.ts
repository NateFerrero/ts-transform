export type To<T> = <TDestination>(
  initialValue: TDestination,
  reducer: (result: TDestination, item: T, index: number) => TDestination,
) => TDestination
