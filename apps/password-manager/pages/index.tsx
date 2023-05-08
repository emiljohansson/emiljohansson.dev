import { Label } from '@radix-ui/react-label'

export default function HomePage() {
	return (
		<>
			<h1 className="heading1">Password Manager</h1>
			<form action="/accounts" method="get">
				<div className="mb-3">
					<Label htmlFor="secret" className="block pr-3">
						Secret
					</Label>
					<input id="secret" name="secret" className="input" />
				</div>
				<button className="btn-primary">Load accounts</button>
			</form>
		</>
	)
}
