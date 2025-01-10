# tidy-tsc

Tidy up tsc (TypeScript compiler) CLI output.

## Install

```sh
npm i -g tidy-tsc
```

## Usage

Pipe output from `tsc` commands into this command:

```sh
tsc | tidyt
tsc -b -f --pretty | tidyt
# etc.
```
