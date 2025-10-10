import { useEffect, useRef } from 'react'

interface Props {
  loadMore: () => void
  loadingMore: boolean
  hasMore: boolean
}

export const useInfinityExercisesScroll = ({ loadMore, hasMore, loadingMore }: Props) => {
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore || loadingMore) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    }, { threshold: 1 })
    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [hasMore, loadingMore, loadMore])
  return {
    loaderRef
  }
}
