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

## Props

Prop | type | default | required | description
--- | --- | --- | --- | ---
tableContainerClassName | string | undefined | | Add a class to the table wrapper div
tableClassName | string | undefined | | Add a class to the table
headerRowRenderer | func | undefined | &#9745; | Rendering the header
bodyRowRenderer | func | undefined | &#9745; | Rendering the bodyRow (item: any, index: number) => any
height | number | 500 | height of the table
stickyHeader | bool | false | Made the header sticky
items | array<any> | undefined | &#9745; | An array of items for the body rows
itemHeight | number | 75 | | height of the body rows
isLoading | bool | false | &#9745; | loading flag for fetching more
fetchMore | func | undefined | &#9745; | () => any
itemsTotalLength | number | undefined | &#9745; | total amount of items for the table
loadingComponent | React.FC | LoadingAnimation | | A component to indicate if loading is active
nodePadding | number | 6 | | amount of items before and after the visible window


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
