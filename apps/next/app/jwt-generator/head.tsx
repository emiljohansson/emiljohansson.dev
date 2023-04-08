import { DefaultTags } from 'app/DefaultTags'

export default function Head() {
	return (
		<>
			<DefaultTags />
			<title>JWT Generator</title>
			<meta name="description" content="Generate a JWT" />
		</>
	)
}
