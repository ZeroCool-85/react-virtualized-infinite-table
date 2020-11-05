import React, { useCallback, useState } from 'react'
import faker from 'faker'

import { InfiniteTable } from 'react-virtualized-infinite-table'
import 'react-virtualized-infinite-table/dist/index.css'

const App = () => {
  const [items, setItems] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [itemsTotalLength] = useState(1000)

  const fetchMore = useCallback(() => {
    setIsLoading(true)
    const moreItems = new Array(20).fill(null).map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      title: faker.name.title(),
      jobTitle: faker.name.jobTitle()
    }))
    setTimeout(() => {
      setItems((prev: any) => [...prev, ...moreItems])
      setIsLoading(false)
    }, 200)
  }, [])

  const bodyRowRenderer = useCallback((item, i) => (
    <tr key={i}>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.title}</td>
      <td>{item.jobTitle}</td>
    </tr>
  ), [])

  const headerRowRenderer = useCallback(() => (
    <tr>
      <td>FirstName</td>
      <td>LastName</td>
      <td>Title</td>
      <td>JobTitle</td>
    </tr>
  ), [])

  return <InfiniteTable
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
}

export default App
