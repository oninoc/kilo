import { useEffect, useRef, useCallback } from 'react'

interface InfiniteScrollProps<T> {
  items: T[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  renderItem: (item: T, index: number) => React.ReactNode
  loadingComponent?: React.ReactNode
  className?: string
  threshold?: number
}

export function InfiniteScroll<T>({
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
  loadingComponent,
  className = "",
  threshold = 100
}: InfiniteScrollProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isFetchingNextPage || !hasNextPage) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    scrollElement.addEventListener('scroll', handleScroll)
    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div 
      ref={scrollRef}
      className={`overflow-y-auto ${className}`}
    >
      <div className="space-y-4">
        {items.map((item, index) => renderItem(item, index))}
        
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            {loadingComponent || (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            )}
          </div>
        )}
        
        {!hasNextPage && items.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            No more items to load
          </div>
        )}
      </div>
    </div>
  )
}
