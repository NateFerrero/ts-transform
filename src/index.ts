export const defined = <T>(value: T | undefined) => typeof value !== 'undefined'

export const defaultValue = <T>(value: T | undefined, fallbackValue: T) =>
  defined(value) ? value : fallbackValue

/**
 * Use `keys` to transform an object's keys and/or values
 */
export const keys = <T extends object>(object: T) => ({
  toArray: <V>(
    reducer: (key: string, value: typeof object[keyof T], result: V[]) => V,
  ): V[] =>
    Object.keys(object).reduce(
      (result, key) => [...result, reducer(key, object[key], result)],
      [],
    ),
  toObject: <V>(
    reducer: (
      key: string,
      value: typeof object[keyof T],
      result: Partial<V>,
    ) => Partial<V>,
  ): V =>
    Object.keys(object).reduce(
      (result, key) => ({ ...result, ...reducer(key, object[key], result) }),
      {} as V,
    ),
  toNumber: (
    reducer: (
      key: string,
      value: typeof object[keyof T],
      result: number,
    ) => number,
  ) =>
    Object.keys(object).reduce(
      (result, key) => result + reducer(key, object[key], result),
      0,
    ),
  toString: (
    reducer: (
      key: string,
      value: typeof object[keyof T],
      result: string,
    ) => string,
  ) =>
    Object.keys(object).reduce(
      (result, key) => reducer(key, object[key], result),
      '',
    ),
})

/**
 * Use `values` to transform an object's values, ignoring keys
 */
export const values = <T extends object>(object: T) => ({
  toArray: <V>(
    reducer: (value: typeof object[keyof T], result: V[]) => V,
  ): V[] =>
    Object.keys(object).reduce(
      (result, key) => [...result, reducer(object[key], result)],
      [],
    ),
  toObject: <V>(
    reducer: (value: typeof object[keyof T], result: Partial<V>) => Partial<V>,
  ): V =>
    Object.keys(object).reduce(
      (result, key) => ({ ...result, ...reducer(object[key], result) }),
      {} as V,
    ),
  toNumber: (
    reducer: (value: typeof object[keyof T], result: number) => number,
  ) =>
    Object.keys(object).reduce(
      (result, key) => result + reducer(object[key], result),
      0,
    ),
  toString: (
    reducer: (value: typeof object[keyof T], result: string) => string,
  ) =>
    Object.keys(object).reduce(
      (result, key) => reducer(object[key], result),
      '',
    ),
})

/**
 * Use `items` to transform an array
 */
export const items = <T>(array: T[]) => ({
  each: (action: (value: T, index: number) => void): void =>
    array.forEach(action),
  toArray: <V>(reducer: (value: T, result: V[], index: number) => V): V[] =>
    array.reduce(
      (result, item, index) => [...result, reducer(item, result, index)],
      [],
    ),
  toObject: <V>(
    reducer: (value: T, result: Partial<V>, index: number) => Partial<V>,
  ): V =>
    array.reduce(
      (result, item, index) => ({ ...result, ...reducer(item, result, index) }),
      {} as V,
    ),
  toNumber: (reducer: (value: T, result: number, index: number) => number) =>
    array.reduce(
      (result, item, index) => result + reducer(item, result, index),
      0,
    ),
  toString: (reducer: (value: T, result: string, index: number) => string) =>
    array.reduce((result, item, index) => reducer(item, result, index), ''),
})

/**
 * Use `chars` to transform characters in a string
 */
export const chars = (string: string) => ({
  toArray: <V>(reducer: (char: string, result: V[], index: number) => V): V[] =>
    string
      .split('')
      .reduce(
        (result, item, index) => [...result, reducer(item, result, index)],
        [],
      ),
  toObject: <V>(
    reducer: (char: string, result: Partial<V>, index: number) => Partial<V>,
  ): V =>
    string.split('').reduce(
      (result, item, index) => ({
        ...result,
        ...reducer(item, result, index),
      }),
      {} as V,
    ),
  toNumber: (
    reducer: (char: string, result: number, index: number) => boolean | number,
  ) =>
    string
      .split('')
      .reduce(
        (result, item, index) => result + Number(reducer(item, result, index)),
        0,
      ),
})
