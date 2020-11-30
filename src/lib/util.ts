import { SCRIPT_NAME } from '/constants'
import { RecursivePartial } from '/types'

type TimeoutRef = { current?: number }
type AFunc = (...args: any[]) => void

export const $ = <T extends Element>(query: string, context: Element | Document = document) =>
  context.querySelector<T>(query)
export const $$ = <T extends Element>(query: string, context: Element | Document = document) =>
  Array.from(context.querySelectorAll<T>(query))
export const log = (...msg: any[]): void =>
  console.log(`%c${SCRIPT_NAME}:`, 'color: orange', ...msg)

export const elem = <T extends keyof HTMLElementTagNameMap>(
  type: T,
  attrs: RecursivePartial<HTMLElementTagNameMap[T]>
) => {
  const btn = document.body.appendChild(document.createElement(type))
  if (attrs.style) {
    Object.assign(btn.style, attrs.style)
    // @ts-expect-error shrug
    delete attrs.style
  }
  return Object.assign(btn, attrs)
}

export const debounce = <T extends AFunc>(ms: number, fn: T, id: TimeoutRef = {}) => (
  ...args: Parameters<T>
) => {
  window.clearTimeout(id.current)
  id.current = window.setTimeout(fn, ms, ...args)
}

export const throttle = <T extends AFunc>(ms: number, fn: T, id: TimeoutRef = {}) => {
  let lastCall = 0
  const throttled = (...args: Parameters<T>) => {
    window.clearTimeout(id.current)
    const delta = Date.now() - lastCall
    // trailing call
    if (delta < ms) {
      id.current = window.setTimeout(throttled, ms - delta, ...args)
      return
    }
    lastCall = Date.now()
    fn(...args)
  }
  return throttled
}

export const repeat = (times: number, callback: (index: number) => void) => {
  for (let i = 0; i < times; i++) callback(i)
}

export const repeatMap = <T>(times: number, callback: (index: number) => T): T[] => {
  const arr: T[] = []
  repeat(times, index => arr.push(callback(index)))
  return arr
}
