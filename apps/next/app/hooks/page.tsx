import randomString from '@emiljohansson/random-string'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { RandomStringExample } from './RandomStringExample'
import { DebounceExample } from './DebounceExample'
import { CounterExample } from './CounterExample'
import { EventListenerExample } from './EventListenerExample'

export default async function HooksPage() {
	return (
		<Content>
			<Header />
			<Section size="normal">
				<h1 className="sr-only">Hooks</h1>
				<article className="flex flex-col gap-4">
					<RandomStringExample initialValue={randomString()} />
					<DebounceExample />
					<CounterExample />
					<EventListenerExample />
				</article>
			</Section>
		</Content>
	)
}
