// import { NanoContextExample } from './NanoContextExample'
import { SvelteStoreExample } from './SvelteStoreExample'

export default function Page() {
	return (
		<div className="grid">
			{/* <NanoContextExample /> */}
			<SvelteStoreExample initDate={new Date()} />
		</div>
	)
}
