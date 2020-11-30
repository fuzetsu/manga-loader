import { m, z } from '/vdom'
import { useState } from 'preact/hooks'
import { useGlobalEvent } from '/hooks'
import { CmpChild } from '../types'

interface Props {
  lower?: number
  upper?: number
  text?: CmpChild
  actions?: CmpChild
}

export const ScrollHud = ({ text, lower = 1, upper = 1, actions = [] }: Props) => {
  const [percent, setPercent] = useState(0)

  const curRatio = lower / upper

  useGlobalEvent(
    'scroll',
    () => {
      const target = document.scrollingElement
      let scrollProgress = 1
      if (target) scrollProgress = (target.scrollTop + target.clientHeight) / target.scrollHeight
      setPercent(Math.min(100, Math.round(scrollProgress * curRatio * 100)))
    },
    { throttle: 250 }
  )

  return m(
    '.scroll-hud' +
      z`
      position fixed
      b 10;l 10
      z-index 100
      $actions-left -300px
      transition opacity 500ms

      o 0.5
      :hover {
        o 1
        $actions-left 0
      }
    `,
    m(
      '' +
        z`
        position relative
        bottom 0
        left $actions-left
        pad 2 b
        transition left 500ms
        > button { d block; w 100%; mar 1 b }
      `,
      actions
    ),
    m(
      'button.scroll-top-button' + z`fs 120%;transition opacity 500ms`,
      { onclick: () => window.scroll({ top: 0, behavior: 'smooth' }) },
      '⌃ ',
      percent,
      text && [m('br'), m('span' + z`fs 65%`, text)]
    )
  )
}
