import { CurrentTime } from '@/components/current-time/CurrentTime'

export function Card() {
	return (
		<div className="flex items-center justify-center text-5xl h-full">
			<CurrentTime />
		</div>
	)
}
