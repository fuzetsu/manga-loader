import { VNode } from 'preact'

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CmpChild = VNode<any> | string | number | boolean | null | undefined | CmpChild[]
