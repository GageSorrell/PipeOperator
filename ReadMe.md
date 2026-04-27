*Copyright &copy; 2026 Gage Sorrell.  Released under the [MIT license](./License.md).*

# `@sorrell/pipe-operator`

The pipe operator, implemented via [`tsover`](https://software-mansion-labs.github.io/tsover/).

## Documentation

[The documentation is available here](https://pipe-operator.sorrell.sh), a subdomain of the author's personal website.

## Requirements

| Package  | Version     |
|---------:|:------------|
| NodeJS   | `>=24.15.0` |
| `tsover` | `>=6.0.0`   |

Your project must also be set up to work with `tsover`.
Their [setup guide is available here](https://software-mansion-labs.github.io/tsover/docs).

## Installation

Once the [requirements](#requirements) are met, just install,

```bash
npm install @sorrell/pipe-operator
```

## Example

```typescript
"use tsover";
import { Pipe as P } from "@sorrell/pipe-operator";

const Value: number = 40;

const Product = (...Values: Array<number>): number =>
    Values.reduce((Prev, Curr) => Prev * Curr, 1);

const FormatDollar = (In: number): string => `$${ In }`;
 
const Price = Value 
    % P(Product, 3, 2)
    % P(FormatDollar);

// `Price` <- `"$240"`
```

## Related Resources

| Package | Description |
|--------:|:------------| 
| [`@sorrell/functional`](https://github.com/GageSorrell/Functional) | Other utilities for functional programming. |
| [`@sorrell/utilities`](https://github.com/GageSorrell/SorrellWm/tree/Master/Package/Utilities) | General-purpose utilities. |
| [`@sorrell/cli-utilities`](https://github.com/GageSorrell/SorrellWm/tree/Master/Package/CliUtilities) | Utilities for CLI applications. |
| [`@sorrell/cli`](https://github.com/GageSorrell/SorrellWm/tree/Master/Package/Cli) | CLI to assist with TypeScript development. |
