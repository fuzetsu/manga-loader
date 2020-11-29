declare module 'microh' {
  type AnyFn = (...args: any[]) => unknown

  type Child<H extends AnyFn> =
    | number
    | string
    | boolean
    | undefined
    | null
    // eslint-disable-next-line @typescript-eslint/ban-types
    | object
    | boolean
    | string
    | Child<H>[]
    | ReturnType<H>

  type VnodeFn<H extends AnyFn> = <T extends AnyFn | string>(
    tag: T,
    props?: (T extends AnyFn ? Parameters<T>[0] : Record<string, unknown>) | Child<H>,
    ...children: Child<H>[]
  ) => ReturnType<H>

  const microh: <H extends VnodeFn<H>>(transform: H) => VnodeFn<H>

  export default microh
}
