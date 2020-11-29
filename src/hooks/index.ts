import { useEffect, useRef } from 'preact/hooks'

export * from './use-dom-event'

export * from './use-scroll-limit'

export const usePropRef = <T>(value: T) => {
  const propRef = useRef<T>(value)
  propRef.current = value
  return propRef
}

export const useTimeout = (
  ms: number,
  fn: (...args: any[]) => void,
  deps: Parameters<typeof useEffect>[1]
) =>
  useEffect(() => {
    const id = setTimeout(fn, ms)
    return () => clearTimeout(id)
  }, deps)
