import type { FunctionComponent as FC, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionComponent<P = {}> = FC<P & {
  children?: ReactNode | ReactNode[],
}>
