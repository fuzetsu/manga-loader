import { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'
import { usePropRef } from '.'
import { debounce, throttle } from '/lib/util'

/** not passing ref will fallback on window */
export const useDOMEvent = <T extends keyof WindowEventMap>({
  ref,
  type,
  handler,
  disabled,
  debounce: db,
  throttle: tt
}: {
  type: T
  handler(evt: WindowEventMap[T]): void
  disabled?: boolean
  ref?: RefObject<Document | Element>
  debounce?: number
  throttle?: number
}) => {
  const handlerRef = usePropRef(handler)

  // bind event using given options, restart if core configs change
  useEffect(() => {
    if (disabled) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let eventHandler = (e: any) => handlerRef.current(e)
    const id = { current: undefined }
    eventHandler = db
      ? debounce(db, eventHandler, id)
      : tt
      ? throttle(tt, eventHandler, id)
      : eventHandler
    const target = ref?.current || window
    target.addEventListener(type, eventHandler)
    return () => {
      clearTimeout(id.current)
      target.removeEventListener(type, eventHandler)
    }
  }, [ref, type, disabled, db, tt])
}

export const useGlobalEvent = <T extends keyof WindowEventMap>(
  type: T,
  handler: (e: WindowEventMap[T]) => void,
  opts?: Omit<Omit<Omit<Parameters<typeof useDOMEvent>[0], 'type'>, 'handler'>, 'ref'>
) => useDOMEvent({ type, handler, ...opts })
