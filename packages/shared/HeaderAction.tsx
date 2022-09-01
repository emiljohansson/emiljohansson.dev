import type { PropsWithChildren, ReactNode } from 'react'

const HeaderAction = ({ children, onClick, ...attributes }: PropsWithChildren<{
  children?: ReactNode
  onClick: () => void
  attributes?: { [key: string]: string }[]
}>) => <button
  className="ml-2"
  onClick={onClick}
  {...attributes}
>{children}</button>

export default HeaderAction
