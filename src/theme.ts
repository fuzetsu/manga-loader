import { colors, helpers } from '/lib/zaftig-tailwind'
import { z } from '/vdom'

export const setupTheme = () => {
  z.helper(helpers)
  z.global(colors)
  z.global`
    $fonts sans-serif

    $main-bg $gray-9
    $main-fg $gray-2

    $btn-bg $gray-8
    $btn-focus $gray-7

    $btn-primary-bg $pink-6
    $btn-primary-focus $pink-5

    $btn-secondary-bg $gray-7
    $btn-secondary-focus $gray-6

    font-sans
    bc $main-bg
    c $main-fg

    * { box-sizing border-box }

    button,input,select { font-sans; fs inherit }

    button {
      c $main-fg
      bc $btn-bg
      outline 0
      cursor pointer
      transition transform 200ms
      :hover,:focus { bc $btn-focus }
      :active { bc $btn-bg; transform scale(0.97) }
      :disabled { cursor not-allowed }
    }

    input,button {
      rounded
      border 1 solid $btn-focus
      p 0.5em
    }

    button.primary {
      $btn-bg $btn-primary-bg
      $btn-focus $btn-primary-focus
    }

    button.secondary {
      $btn-bg $btn-secondary-bg
      $btn-focus $btn-secondary-focus
    }

    .link {
      c $link-fg
      cursor pointer
      :hover { td underline }
    }
  `
}
