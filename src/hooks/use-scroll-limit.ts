import { RefObject } from 'preact'
import { useTimeout, useDOMEvent } from '.'

interface Conf {
  ontrigger(): void
  disabled?: boolean
  threshold?: number
  ref?: RefObject<Element>
}

export const useScrollLimit = ({ ref, threshold = 3, ontrigger, disabled }: Conf) => {
  const check = () => {
    if (disabled) return
    const t = ref ? ref.current : document.scrollingElement
    if (t && t.scrollHeight - t.scrollTop < t.clientHeight * threshold) ontrigger()
  }
  useTimeout(800, check, [disabled])
  useDOMEvent({ ref, type: 'scroll', handler: check, disabled, throttle: 1000 })
}
