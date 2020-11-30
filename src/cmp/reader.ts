import { useEffect, useState } from 'preact/hooks'
import { ScrollHud } from './scroll-hud'
import { useGlobalEvent, useScrollLimit } from '/hooks'
import { Metadata } from '/lib/websites'
import { m, z } from '/vdom'

interface Props {
  imageUrls: AsyncGenerator<string> | string[]
  metadata: Metadata
}

const INITIAL_LOAD = 10
const BATCH_SIZE = 5

export const Reader = ({
  imageUrls,
  metadata: { nextChapterUrl, previousChapterUrl, numPages }
}: Props) => {
  const [limit, setLimit] = useState(INITIAL_LOAD)
  useScrollLimit({ ontrigger: () => setLimit(limit + BATCH_SIZE), disabled: limit >= numPages })

  const [images, setImages] = useState<string[]>([])
  const loadImages = async () => {
    if (Array.isArray(imageUrls)) {
      setImages(imageUrls)
      return
    }
    setLoading(true)
    for (let i = 0; i < BATCH_SIZE; i++) {
      const { value, done } = await imageUrls.next()
      setImages(x => x.concat(value))
      if (done) break
    }
    setLoading(false)
  }

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (loading || images.length >= numPages || images.length - limit >= BATCH_SIZE) return
    loadImages()
  }, [limit, loading, images])

  const toggleFullscreen = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.scrollingElement?.requestFullscreen()

  useGlobalEvent('keydown', e => {
    if (e.key.toLowerCase() === 'f') toggleFullscreen()
  })

  return m(
    'main',
    m(
      'section',
      m(ScrollHud, {
        lower: limit,
        upper: numPages,
        text: loading && 'Loading...',
        actions: [
          nextChapterUrl &&
            m('button', { onclick: () => (location.href = nextChapterUrl) }, 'Next chapter'),
          previousChapterUrl &&
            m(
              'button',
              { onclick: () => (location.href = previousChapterUrl) },
              'Previous chapter'
            ),
          m('button', { onclick: toggleFullscreen }, 'Toggle fullscreen'),
          m('button', { onclick: () => location.reload() }, 'Exit')
        ]
      }),
      images.slice(0, limit).map(url =>
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
