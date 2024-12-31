'use client'

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Tables } from '@/lib/database.types'
import { action, atom } from 'nanostores'
import { useStore } from '@nanostores/react'
import { Command, File, Sun, Moon, LucideIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

type Action = Partial<Tables<'project'>> & {
	Icon: LucideIcon
	select: () => void
}

export const $commandMenuIsOpen = atom(false)
export const openCommandMenu = action(
	$commandMenuIsOpen,
	'openCommandMenu',
	() => $commandMenuIsOpen.set(true),
)
export const closeCommandMenu = action(
	$commandMenuIsOpen,
	'closeCommandMenu',
	() => $commandMenuIsOpen.set(false),
)

export function CommandTrigger() {
	return (
		<Button
			variant="outline"
			className="flex"
			onClick={() => openCommandMenu()}
		>
			Command Menu{' '}
			<span
				className="
					flex items-center gap-1
					bg-gray-300 dark:bg-zinc-900
					px-1 py-0.5
					text-xs text-gray-600
					rounded
				"
			>
				<Command size={12} /> K
			</span>
		</Button>
	)
}

export function CommandMenu({ projects }: { projects: Tables<'project'>[] }) {
	const commandMenuIsOpen = useStore($commandMenuIsOpen)
	const { setTheme } = useTheme()
	const initList = useMemo<Action[]>(
		() => [
			{
				href: '/',
				title: 'Home',
				description: 'Return to the home page.',
				test: 'home-page',
				Icon: File,
				select() {
					router.push(this.href!)
				},
			},
			...projects.map((project) => ({
				...project,
				Icon: File,
				select() {
					router.push(project.href)
				},
			})),
			{
				title: 'Light',
				Icon: Sun,
				select() {
					setTheme('light')
				},
			},
			{
				title: 'Dark',
				Icon: Moon,
				select() {
					setTheme('dark')
				},
			},
		],
		[],
	)
	const router = useRouter()
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [list, setList] = useState(initList)
	const fieldRef = useRef<HTMLInputElement>(null)

	function handleAction(action?: Action) {
		if (!action) return
		setList([...initList])
		closeCommandMenu()
		action.select()
	}

	useEffect(() => {
		fieldRef.current?.focus()
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey && event.key === 'k') {
				event.preventDefault()
				openCommandMenu()
				return
			}
			if (!commandMenuIsOpen) return
			if (!['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key)) {
				return
			}
			event.preventDefault()
			if (event.key === 'ArrowUp') {
				let newIndex = selectedIndex - 1
				if (newIndex < 0) newIndex = list.length - 1
				setSelectedIndex(newIndex)
			}
			if (event.key === 'ArrowDown') {
				let newIndex = selectedIndex + 1
				if (newIndex >= list.length) newIndex = 0
				setSelectedIndex(newIndex)
			}
			if (event.key === 'Escape') closeCommandMenu()
			if (event.key === 'Enter') {
				handleAction(list[selectedIndex])
			}
		}

		document.addEventListener('keydown', onKeyDown)

		return () => document.removeEventListener('keydown', onKeyDown)
	}, [selectedIndex, list, commandMenuIsOpen])

	if (!commandMenuIsOpen) return null

	return (
		<Modal onClose={closeCommandMenu}>
			<div className="flex items-center border-gray-200 border-b pl-1.5">
				<div className="p-2">
					<Search size={20} strokeWidth={1.25} />
				</div>
				<input
					ref={fieldRef}
					className="input text-sm border-none pr-4 pl-0 py-6 flex-1"
					placeholder="Type a command or search..."
					onChange={(event) => {
						setSelectedIndex(0)
						setList(
							initList.filter(
								({ title }) =>
									title!.toLowerCase().indexOf(event.currentTarget.value) > -1,
							),
						)
					}}
				/>
			</div>
			<span className="sr-only">{selectedIndex}</span>
			<div className="p-2">
				{list.map((project, index) => (
					<div
						key={index}
						className="flex gap-2 aria-selected:bg-gray-300 dark:aria-selected:bg-accent text-sm  px-2 py-2 rounded"
						aria-selected={index === selectedIndex}
						onMouseOver={() => setSelectedIndex(index)}
						onClick={() => handleAction(list[index])}
					>
						<project.Icon size={20} /> {project.title}
					</div>
				))}
				{list.length < 1 && (
					<div className="py-4 text-center text-sm" role="presentation">
						No results found.
					</div>
				)}
			</div>
		</Modal>
	)
}

function Modal({
	children,
	onClose,
}: PropsWithChildren<{ onClose: () => void }>) {
	const rootRef = useClickOutside<HTMLDivElement>(onClose)

	return (
		<>
			<div className="fixed inset-0 z-40 min-h-screen">
				<div
					ref={rootRef}
					className="w-full max-w-md rounded shadow-xl overflow-hidden mx-auto mt-20"
				>
					<div className="bg-white dark:bg-black-rich rounded border-gray-200 border">
						{children}
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur" />
		</>
	)
}
