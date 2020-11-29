declare module 'zaftig' {
  interface ZaftigStyle {
    className: string
    class: string
    valueOf(): string
    toString(): string
  }

  type ZaftigTemplateFn<T> = (
    body: TemplateStringsArray,
    ...subs: (string | number | boolean)[]
  ) => T
  type ZaftigStringFn<T> = (style: string) => T
  type ZaftigFn<T> = ZaftigTemplateFn<T> & ZaftigStringFn<T>
  type HelperMap = { [key: string]: string | ((...args: any[]) => string) }

  const z: ZaftigFn<ZaftigStyle> & {
    style: ZaftigFn<string>
    global: ZaftigFn<void>
    anim: ZaftigFn<string>
    helper(helpers: HelperMap): void
    getSheet(): HTMLStyleElement
    ['new'](conf?: {
      style?: HTMLStyleElement
      id?: string
      helpers?: HelperMap
      unit?: 'rem' | 'px' | 'em'
      debug?: boolean
    }): typeof z
    setDebug(state: boolean): void
  }

  export default z
}
