'use client'

import { MuseoModerno } from 'next/font/google'
import { Header, Select, SelectItem } from '@repo/ui'
import { useStore } from '@nanostores/react'
import { Board } from './Board'
import { $selectedDifficulty } from './store'
import { BoardStyle, SelectedDifficulty } from './types'
import { easy, hard, medium } from './difficulties'

const myFont = MuseoModerno({
	weight: '300',
	subsets: ['latin'],
	display: 'swap',
})

const difficulties = [
	{
		value: 'easy',
		title: easy.title,
	},
	{
		value: 'medium',
		title: medium.title,
	},
	{
		value: 'hard',
		title: hard.title,
	},
]

export default function MineSweaper() {
	const selectedDifficulty = useStore($selectedDifficulty)

	return (
		<>
			<header>
				<Header />
			</header>
			<nav className="flex mb-3">
				<div className="mx-1.5">
					<Select
						defaultValue={easy.value}
						options={difficulties}
						onValueChange={(newValue) => {
							$selectedDifficulty.set({
								type: 'loading',
								queueType: newValue as SelectedDifficulty,
								board: {} as BoardStyle,
								level: easy,
							})
						}}
					>
						{difficulties.map(({ value, title }) => (
							<SelectItem key={value} value={value}>
								{title}
							</SelectItem>
						))}
					</Select>
				</div>
				<div className="mx-1.5">
					<button
						className="btn-outline"
						onClick={() => {
							$selectedDifficulty.set({
								type: 'loading',
								queueType: selectedDifficulty.type,
								board: {} as BoardStyle,
								level: easy,
							})
						}}
					>
						Restart
					</button>
				</div>
			</nav>
			<main className={myFont.className}>
				{selectedDifficulty.type === 'loading' ? (
					<></>
				) : (
					<Board difficulty={selectedDifficulty.level} />
				)}
			</main>
		</>
	)
}
