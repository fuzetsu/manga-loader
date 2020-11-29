import zaftig from 'zaftig'

let z = zaftig
if (process.env.NODE_ENV === 'development') {
  zaftig.setDebug(true)
  const seen = new Set<string>()
  let oldStyle = ''
  // @ts-expect-error some type shenanigans, sorry
  z = (...args: any[]) => {
    // @ts-expect-error yep
    const res = zaftig(...args)
    if (res && !seen.has(res.class)) {
      seen.add(res.class)
      const curStyle = z.getSheet().textContent || ''
      console.groupCollapsed('%czaftig new class:', 'color:hotpink;font-weight:bold', res.class)
      console.log(curStyle.slice(oldStyle.length).trim())
      console.log('%cstylesheet size:', 'font-weight:bold', curStyle.length)
      console.groupEnd()
      oldStyle = curStyle
    }
    return res
  }
  Object.assign(z, zaftig)
}

export { z }

import { h } from 'preact'
import microh from 'microh'
export const m = microh(h)

// // for debugging redraws
// const cache = new Map()
// export const m = (cmp, ...rest) => {
//   let proxy = cmp
//   if (typeof cmp === 'function') {
//     proxy = cache.get(cmp)
//     if (!proxy) {
//       proxy = (...args) => {
//         console.log('REDRAWING', cmp.name, Date.now())
//         return cmp(...args)
//       }
//       cache.set(cmp, proxy)
//     }
//   }
//   return _m(proxy, ...rest)
// }
