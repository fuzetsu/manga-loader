import { render } from 'preact'
import { m } from '/vdom'
import { elem, log } from '/lib/util'
import { Reader } from '/cmp'
import { setupTheme } from '/theme'
import { websites } from '/lib/websites'

log('loaded script')

const loadManga = () => {
  log('loading manga')
  // find site that matches page url
  const url = location.href
  const site = websites.find(site => new RegExp(site.match, 'i').test(url))
  if (!site) {
    log('dang, could not find a matching site implementation... sad day')
    return
  }
  log('found matching site handler', site)
  const imageUrls = site.getImages()
  const metadata = site.getMetadata?.()
  // clear site content
  document.body.innerHTML = document.head.innerHTML = ''
  // render app with images from site
  setupTheme()
  render(m(Reader, { imageUrls, metadata }), document.body)
}

elem('button', {
  textContent: 'Load manga',
  style: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    margin: '10px',
    fontSize: '120%',
    padding: '5px',
    cursor: 'pointer'
  },
  onclick: loadManga
})
