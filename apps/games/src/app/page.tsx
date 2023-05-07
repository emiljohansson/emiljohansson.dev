import Link from 'next/link'

export default function HomePage() {
	return (
		<>
			<h1>Games</h1>
			<ul className="grid gap-2">
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
				<li>
					<Link href="/ms">Mine Sweaper</Link>
				</li>
			</ul>
		</>
	)
}
