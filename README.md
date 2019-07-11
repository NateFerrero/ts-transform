# ts-transform

TypeScript Data Transformation Utilities

## Development

Run unit tests with `npm test`

## `chars`

```typescript
import { chars } from 'ts-transform'

chars('canada').array(char => char.charCodeAt(0))
// [99, 97, 110, 97, 100, 97]

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
