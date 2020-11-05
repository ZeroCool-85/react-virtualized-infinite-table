import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  tableContainerClassName?: string
  tableClassName?: string
  headerRowRenderer: () => any
  bodyRowRenderer: (item: any, index: number) => any
  height: number
  stickyHeader?: boolean
  items: Array<any>
  itemHeight: number
  isLoading: boolean
  fetchMore: () => any
  itemsTotalLength: number
  loadingComponent?: React.ReactNode
  nodePadding?: number
}

const LoadingAnimation = () => (
  <div className={styles.loadingAnimation}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export const InfiniteTable = ({
  tableContainerClassName,
  tableClassName,
  headerRowRenderer,
  bodyRowRenderer,
  height,
  stickyHeader,
  items,
  itemHeight: ITEM_HEIGHT,
  isLoading,
  fetchMore,
  itemsTotalLength,
  loadingComponent: LoadingComponent = LoadingAnimation,
  nodePadding = 6
}: Props) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const loaderRef = React.useRef<HTMLTableRowElement>(null)
  const [scrollPosition, setScrollPosition] = React.useState(0)
  const [startFetchItems, setStartFetchItems] = React.useState(false)
  const [renderingParams, setRenderingParams] = React.useState({
    offsetY: 0,
    visibleNodesCount: 0,
    startNode: 0
  })

  React.useEffect(() => {
    calcRenderingParams()
  }, [scrollPosition])

  React.useEffect(() => {
    calcRenderingParams()
  }, [items])

  const calcRenderingParams = React.useCallback(() => {
    let startNode = Math.floor(scrollPosition / ITEM_HEIGHT) - nodePadding
    startNode = Math.max(0, startNode)

    let visibleNodesCount = Math.ceil(height / ITEM_HEIGHT) + 2 * nodePadding
    visibleNodesCount = Math.min(items.length - startNode, visibleNodesCount)
    visibleNodesCount = Math.max(0, visibleNodesCount)

    setRenderingParams({
      offsetY: startNode * ITEM_HEIGHT,
      visibleNodesCount,
      startNode
    })
  }, [scrollPosition, items])

  React.useEffect(() => {
    if (!isLoading) {
      setStartFetchItems(false)
    }
  }, [isLoading])

  React.useEffect(() => {
    if (startFetchItems && items.length !== itemsTotalLength) {
      fetchMore()
    }
  }, [startFetchItems])

  const triggerFetchMore = React.useCallback(
    (entities) => {
      const target = entities[0]
      if (target.isIntersecting) {
        setStartFetchItems(true)
      }
    },
    [items, startFetchItems]
  )

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(triggerFetchMore, options)
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }
  }, [loaderRef.current, triggerFetchMore])

  const startFetchMore = React.useCallback(
    (e) => {
      if (e.target === tableContainerRef.current) {
        setScrollPosition(e.target.scrollTop)
      }
    },
    [tableContainerRef]
  )

  const renderRows = React.useMemo(() => {
    return items.length
      ? new Array(renderingParams.visibleNodesCount)
          .fill(null)
          .map((_, index) =>
            items[index + renderingParams.startNode]
              ? bodyRowRenderer(
                  items[index + renderingParams.startNode],
                  index + renderingParams.startNode
                )
              : null
          )
      : null
  }, [items, renderingParams])

  const renderPlaceHolderContainer = (index: number) => {
    return <tr style={{ height: index * ITEM_HEIGHT }} />
  }

  return (
    <div
      className={[styles.tableContainer, tableContainerClassName].join(' ')}
      onScroll={startFetchMore}
      ref={tableContainerRef}
      style={{ height }}
    >
      <table
        className={[
          styles.table,
          tableClassName
        ].join(' ')}
        style={{
          height: items.length ? items.length * ITEM_HEIGHT : ITEM_HEIGHT
        }}
      >
        <thead className={stickyHeader ? styles.stickyHeader : undefined}>
          {headerRowRenderer()}
        </thead>
        <tbody>
          {renderPlaceHolderContainer(renderingParams.startNode)}
          {renderRows}
          <tr ref={loaderRef} />
          {startFetchItems && LoadingComponent}
          {renderPlaceHolderContainer(
            items.length -
              (renderingParams.startNode + renderingParams.visibleNodesCount)
          )}
        </tbody>
      </table>
    </div>
  )
}
