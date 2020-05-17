// ==UserScript==
// @name        Manga Loader Reloaded
// @namespace   manga-loader-reloaded
// @version     0.0.1
// @description The best manga reading experience the web has to offer. Genuflect/kowtow mortals.
// @copyright   2020+ fuzetsu/alhsu
// @match       https://kissmanga.com/Manga/*/*
// @match       https://www.mangatown.com/manga/*/*/*
// @require     https://unpkg.com/preact@10.4.1/dist/preact.umd.js
// @require     https://unpkg.com/preact@10.4.1/hooks/dist/hooks.umd.js
// @require     https://unpkg.com/zaftig@0.9.0/dist/zaftig.es5.min.js
// @require     https://unpkg.com/microh@0.1.0/dist/microh.es5.min.js
// @noframes
// ==/UserScript==

const SCRIPT_NAME = 'Manga Loader Reloaded'

const m = microh(preact.h)
const { useEffect, useRef, useState } = preactHooks

const $ = (q, c = document) => c.querySelector(q)
const $$ = (q, c = document) => Array.from(c.querySelectorAll(q))
const log = (...msg) => console.log(`%c${SCRIPT_NAME}:`, 'color: orange', ...msg)
const elem = (type, attrs) => {
  const btn = document.body.appendChild(document.createElement(type))
  if (attrs.style) {
    Object.assign(btn.style, attrs.style)
    delete attrs.style
  }
  return Object.assign(btn, attrs)
}

const debounce = (ms, fn, id = {}) => (...args) => {
  clearTimeout(id.current)
  id.current = setTimeout(fn, ms, ...args)
}

const throttle = (ms, fn, id = {}) => {
  let lastCall
  const throttled = (...args) => {
    clearTimeout(id.current)
    const delta = Date.now() - lastCall
    // trailing call
    if (delta < ms) {
      id.current = setTimeout(throttled, ms - delta, ...args)
      return
    }
    lastCall = Date.now()
    fn(...args)
  }
  return throttled
}

const usePropRef = val => {
  const propRef = useRef()
  propRef.current = val
  return propRef
}

const useDOMEvent = ({
  ref = { current: window },
  type,
  handler,
  disabled,
  debounce: db,
  throttle: tt
}) => {
  const handlerRef = usePropRef(handler)

  // bind event using given options, restart if core configs change
  useEffect(() => {
    if (!ref || !ref.current || disabled) return
    let eventHandler = e => handlerRef.current(e)
    const id = {}
    eventHandler = db
      ? debounce(db, eventHandler, id)
      : tt
      ? throttle(tt, eventHandler, id)
      : eventHandler
    const target = ref.current
    target.addEventListener(type, eventHandler)
    return () => {
      clearTimeout(id.current)
      target.removeEventListener(type, eventHandler)
    }
  }, [ref, type, disabled, db, tt])
}

const useTimeout = (ms, fn, deps) =>
  useEffect(() => {
    const id = setTimeout(fn, ms)
    return () => clearTimeout(id)
  }, deps)

const useScrollLimit = ({ ref, threshold = 3, ontrigger, disabled }) => {
  const check = () => {
    if (disabled) return
    const t = ref ? ref.current : document.scrollingElement
    if (t && t.scrollHeight - t.scrollTop < t.clientHeight * threshold) ontrigger()
  }
  useTimeout(800, check, [disabled])
  useDOMEvent({ ref, type: 'scroll', handler: check, disabled, throttle: 1000 })
}

log('SCRIPT LOADED')

const App = ({ imageUrls, numImages, getMoreImages }) => {
  useEffect(
    () => z.global`
      $bg-color #333
      $fg-color white
      $primary-color #f2dc65
      $secondary-color #30475e
      $highlight-color #222831

      font-family sans-serif
      background $bg-color
      color $fg-color
    `,
    []
  )

  log('loaded with urls', imageUrls)

  const [urls, setUrls] = useState(imageUrls)
  const [limit, setLimit] = useState(10)
  useScrollLimit({ ontrigger: () => setLimit(limit + 5) })

  useEffect(async () => {
    if (!getMoreImages || limit >= numImages) return
    // requests more images
    const nextImages = await getMoreImages(limit)
    setUrls(x => x.concat(nextImages))
  }, [limit, getMoreImages, numImages])

  return m(
    'main',
    m(
      'header',
      m('h1' + z`text-align center;color $primary-color;font-size 24;margin 12`, SCRIPT_NAME)
    ),
    m(
      'section',
      urls.slice(0, limit).map(url =>
        m(
          'img' +
            z`
            display block
            margin auto
            max-width 98%
            margin-bottom 10
          `,
          { src: url }
        )
      )
    )
  )
}

const websites = [
  {
    name: 'kissmanga',
    match: 'kissmanga.com/Manga/[^/]+/[^/]+',
    getImages: () => $$('#divImage img').map(img => img.src)
  },
  {
    name: 'magantown',
    match: 'mangatown.com/manga/[^/]+/[^/]+',
    getImages: () => {
      const { src } = $('#image')
      const numPages = $('.page_select select').options.length - 1
      log(src, numPages)
      return Array.from({ length: numPages }, (_, idx) =>
        src.replace(/[0-9]+\.(jpg|png)/, `${String(idx + 1).padStart(3, '0')}.$1`)
      )
    }
  }
]

const loadManga = () => {
  log('MOUNTING PREACT')
  // find site that matches page url
  const url = location.href
  const site = websites.find(site => new RegExp(site.match, 'i').test(url))
  if (!site) {
    log('dang, could not find a matching site implementation... sad day')
    return
  }
  log('found site', site)
  const imageUrls = site.getImages()
  // clear site content
  document.body.innerHTML = document.head.innerHTML = ''
  // render app with images from site
  preact.render(m(App, { imageUrls, getMoreImages: site.getMoreImages }), document.body)
}

elem('button', {
  textContent: 'Load manga',
  style: { position: 'fixed', bottom: 0, right: 0, margin: '10px' },
  onclick: loadManga
})
