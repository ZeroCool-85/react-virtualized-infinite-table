# react-virtualized-infinite-table

> A virtualized infinite scrolling table for react.

[![NPM](https://img.shields.io/npm/v/react-virtualized-infinite-table.svg)](https://www.npmjs.com/package/react-virtualized-infinite-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-virtualized-infinite-table
yarn add react-virtualized-infinite-table --save
```

## Example

[example table](https://zerocool-85.github.io/react-virtualized-infinite-table/)

## Usage

```tsx
import React, { Component } from 'react'

import { InfiniteTable } from 'react-virtualized-infinite-table'
import 'react-virtualized-infinite-table/dist/index.css'

class Example extends Component {
  render() {
    return (
      <InfiniteTable
        tableClassName={"table"}
         height={800}
         bodyRowRenderer={bodyRowRenderer}
         headerRowRenderer={headerRowRenderer}
         fetchMore={fetchMore}
         isLoading={isLoading}
         itemHeight={75}
         items={items}
         itemsTotalLength={itemsTotalLength}
         stickyHeader
      />
    )
  }
}
```

## License

MIT © [ZeroCool-85](https://github.com/ZeroCool-85)
