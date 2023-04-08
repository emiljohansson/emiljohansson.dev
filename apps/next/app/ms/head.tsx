import { DefaultTags } from 'app/DefaultTags'

export default function Head() {
	return (
		<>
			<DefaultTags />
			<title>ms</title>
			<meta name="description" content="ms" />
			<link
				rel="preload"
				href="/fonts/MuseoModerno-Light.ttf"
				as="font"
				crossOrigin=""
			/>
		</>
	)
}
