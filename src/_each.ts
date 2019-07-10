export const _each = <T>(
  to: (
    initialValue: void,
    reducer: (result: void, item: T, index: number) => void,
  ) => void,
) => (action: (value: T, index: number) => void) =>
  to(undefined, (result, value: T, index) => {
    action(value, index)
  })
