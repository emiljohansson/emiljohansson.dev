import type { FunctionComponent } from '@repo/lib/@types'

const Content: FunctionComponent = ({ children }) => {
	return <section className="flex flex-col h-full">{children}</section>
}

export default Content
