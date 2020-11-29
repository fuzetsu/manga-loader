import { useState } from 'preact/hooks'
import { ScrollHud } from './scroll-hud'
import { useScrollLimit } from '/hooks'
import { m, z } from '/vdom'

interface Props {
  imageUrls: string[]
}

export const App = ({ imageUrls }: Props) => {
  const [limit, setLimit] = useState(10)
  useScrollLimit({ ontrigger: () => setLimit(limit + 5), disabled: limit >= imageUrls.length })

  return m(
    'main',
    m(
      'section',
      m(ScrollHud, {
        lower: limit,
        upper: imageUrls.length,
        actions: [
          m(
            'button',
            {
              onclick: () =>
                document.fullscreenElement
                  ? document.exitFullscreen()
                  : document.scrollingElement?.requestFullscreen()
            },
            'Toggle fullscreen'
          ),
          m('button', { onclick: () => location.reload() }, 'Exit')
        ]
      }),
      imageUrls.slice(0, limit).map(url =>
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
