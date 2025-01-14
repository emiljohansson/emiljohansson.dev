import randomString from '@emiljohansson/random-string'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { RandomStringExample } from './RandomStringExample'
import { DebounceExample } from './DebounceExample'
import { CounterExample } from './CounterExample'
import { EventListenerExample } from './EventListenerExample'
import { ClickOutsideExample } from './ClickOutsideExample'
import { ComputedExample } from './ComputedExample'

export default async function HooksPage() {
	return (
		<Content>
			<Section size="normal">
				<h1 className="sr-only">Hooks</h1>
				<article className="flex flex-col gap-4 my-6">
					<RandomStringExample initialValue={randomString()} />
					<DebounceExample />
					<CounterExample />
					<EventListenerExample />
					<ClickOutsideExample />
					<ComputedExample />
				</article>
			</Section>
		</Content>
	)
}
