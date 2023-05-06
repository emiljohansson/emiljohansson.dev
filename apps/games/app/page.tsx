import type { NextPage } from 'next'

import Link from 'next/link'

const HomePage: NextPage = () => {
	return (
		<main>
			<h1>Games</h1>
			<ul>
				<li>
					<Link href="/spider">Spider Solitaire</Link>
				</li>
				<li>
					<Link href="/idiot">
						The Idiot Solitaire (from swedish "Idioten")
					</Link>
				</li>
				<li>
					<Link href="/wordle">Bad Wordle "clone"</Link>
				</li>
			</ul>
		</main>
	)
}

export default HomePage
