import Head from 'next/head'
import { useRef } from 'react'
import { CopyIcon, UpdateIcon } from '@radix-ui/react-icons'
import randomString from '@emiljohansson/random-string'
import { copyToClipboard } from 'lib/utils/string'
import Layout from '@/components/Layout'
import RandomString, { Ref } from '@/components/RandomString'
import Header from 'shared/Header'
import HeaderAction from 'shared/HeaderAction'
import Content from '@/components/Content'
import Section from '@/components/Section'

export async function getServerSideProps() {
	return {
		props: {
			initialValue: randomString(),
		},
	}
}

const RandomStringPage = ({ initialValue }: { initialValue: string }) => {
	const randomStringRef = useRef<Ref>(null)

	return (
		<Layout>
			<Head>
				<title>Random String</title>
				<meta name="description" content="Genrates a random string" />
			</Head>
			<Content>
				<Header>
					<HeaderAction
						onClick={() => randomStringRef.current.generateNewValue()}
						data-test="refresh"
					>
						<UpdateIcon width={30} height={30} />
						<span className="sr-only">Refresh</span>
					</HeaderAction>
					<HeaderAction
						onClick={() => copyToClipboard(randomStringRef.current.getValue())}
						data-test="copy"
					>
						<CopyIcon width={30} height={30} />
						<span className="sr-only">Copy</span>
					</HeaderAction>
				</Header>
				<Section size="large">
					<h1 className="sr-only">Random string</h1>
					<RandomString ref={randomStringRef} initialValue={initialValue} />
				</Section>
			</Content>
		</Layout>
	)
}

export default RandomStringPage
