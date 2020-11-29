import { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'
import { usePropRef } from '.'
import { debounce, throttle } from '/lib/util'

interface DOMEventConf {
  type: string
  handler(e: Event): void
  disabled?: boolean
  ref?: RefObject<Document | Element>
  debounce?: number
  throttle?: number
}

/** not passing ref will fallback on window */
export const useDOMEvent = ({
  ref,
  type,
  handler,
  disabled,
  debounce: db,
  throttle: tt
}: DOMEventConf) => {
  const handlerRef = usePropRef(handler)

  // bind event using given options, restart if core configs change
  useEffect(() => {
    if (disabled) return
    let eventHandler = (e: Event) => handlerRef.current(e)
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

export const useGlobalEvent = (
  type: DOMEventConf['type'],
  handler: DOMEventConf['handler'],
  opts: Omit<Omit<DOMEventConf, 'type'>, 'handler'>
) => useDOMEvent({ type, handler, ...opts })
