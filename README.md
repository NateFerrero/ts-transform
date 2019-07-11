# ts-transform

TypeScript Data Transformation Utilities

## Development

Run unit tests with `npm test`

## `chars`

```typescript
import { chars } from '@simpletype/ts-transform'

chars('canada').array(char => char.charCodeAt(0))
// [ 99, 97, 110, 97, 100, 97 ]

chars('canada').count(char => char === 'a')
// 3

chars('abc').each((char, index) => console.log(`${index}: ${char}`))
// 0: a
// 1: b
// 2: c

chars('abc').object((char, index) => ({ [char]: index }))
// { a: 0, b: 1, c: 2 }

chars('12345').sum(char => parseInt(char))
// 15

chars('12345').to<number>(100, (total, char) => total * parseInt(char))
// 12000

chars('12345').to<string>('go!', (message, char) => `${char} … ${message}`)
// '5 … 4 … 3 … 2 … 1 … go!'
```

## `defaultValue`

```typescript
import { defaultValue } from '@simpletype/ts-transform'

defaultValue(0, 1)
// 0

defaultValue(undefined, 1)
// 1
```

## `defined`

```typescript
import { defined } from '@simpletype/ts-transform'

defined(0)
// true

defined(null)
// true

defined(undefined)
// false
```

## `items`

```typescript
import { items } from '@simpletype/ts-transform'

items([1, 2, 3]).array(x => x * 10)
// [ 10, 20, 30 ]

items([1, 2, 3]).count(x => x % 2 === 1)
// 2

items([1, 2, 3]).each((x, index) => console.log(`${index}: ${x}`))
// 0: 1
// 1: 2
// 2: 3

items([1, 2, 3]).object((x, index) => ({ [index]: x }))
// { '0': 1, '1': 2, '2': 3 }

items([1, 2, 3]).sum(x => x)
// 6

items([1, 2, 3]).to<number>(100, (total, x) => total * x)
// 600

items([1, 2, 3]).to<string>('go!', (message, x) => `${x} … ${message}`)
// '3 … 2 … 1 … go!'
```

## `keys`

All operations available on `items()` above are also available on `keys()`, but for brevity only one example is shown.

```typescript
import { keys } from '@simpletype/ts-transform'

keys({ a: 1, b: 2, c: 3 }).to<string>(
  '',
  (message, key) => `${message}${message === '' ? '' : ', '}${key}`,
)
// 'a, b, c'
```

## `keyValues`

All operations available on `items()` above are also available on `keyValues()`, but for brevity only one example is shown.

```typescript
import { keyValues } from '@simpletype/ts-transform'

keyValues({ a: 1, b: 2, c: 3 }).to<string>(
  '',
  (message, [key, value]) =>
    `${message}${message === '' ? '' : ', '}${key}=${value}`,
)
// 'a=1, b=2, c=3'
```

## `values`

All operations available on `items()` above are also available on `values()`, but for brevity only one example is shown.

```typescript
import { values } from '@simpletype/ts-transform'

values({ a: 1, b: 2, c: 3 }).to<string>(
  '',
  (message, value) => `${message}${message === '' ? '' : ', '}${value}`,
)
// '1, 2, 3'
```
