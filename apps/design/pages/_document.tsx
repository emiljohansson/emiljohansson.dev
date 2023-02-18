import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head></Head>
				<body className="dark:bg-black-rich dark:text-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
