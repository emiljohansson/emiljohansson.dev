import { DefaultTags } from 'app/DefaultTags'

export default function Head() {
	return (
		<>
			<DefaultTags />
			<title>JWT Debugger</title>
			<meta name="description" content="JWT Encoder and Decoder" />
		</>
	)
}
