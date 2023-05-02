'use client'

import type { Project } from './types'

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export function CommandPrompt({ projects }: { projects: Project[] }) {
	const initList = useMemo(
		() => [
			{
				href: '/',
				title: 'Home',
				description: 'Return to the home page.',
				test: 'home-page',
			} as Project,
			...projects,
		],
		[],
	)
	const router = useRouter()
	const [showModal, setShowModal] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [list, setList] = useState(initList)
	const fieldRef = useRef<HTMLInputElement>(null)

	const handleAction = (action?: Project) => {
		console.log(action)
		if (!action) return
		router.push(action.href)
	}

	useEffect(() => {
		fieldRef.current?.focus()
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey && event.key === 'k') {
				event.preventDefault()
				setShowModal(true)
				return
			}
			if (!showModal) return
			if (!['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key)) {
				return
			}
			event.preventDefault()
			console.log(
				'key',
				event.key,
				selectedIndex,
				selectedIndex - 1,
				selectedIndex + 1,
			)
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
			if (event.key === 'Escape') setShowModal(false)
			if (event.key === 'Enter') {
				setList([...initList])
				handleAction(list[selectedIndex])
				setShowModal(false)
			}
		}

		document.addEventListener('keydown', onKeyDown)

		return () => document.removeEventListener('keydown', onKeyDown)
	}, [selectedIndex, list, showModal])

	return (
		<>
			{showModal && (
				<Modal>
					<div className="flex items-center">
						<MagnifyingGlassIcon width={20} height={20} />
						<input
							ref={fieldRef}
							id="input1"
							className="input flex-1"
							placeholder="Type a command or search..."
							onChange={(event) => {
								setSelectedIndex(0)
								setList(
									initList.filter(
										({ title }) =>
											title.toLowerCase().indexOf(event.currentTarget.value) >
											-1,
									),
								)
							}}
						/>
					</div>
					<span className="sr-only">{selectedIndex}</span>
					<div>
						{list.map((project, index) => (
							<div
								key={index}
								className="aria-selected:bg-black-500"
								aria-selected={index === selectedIndex}
								onMouseOver={() => setSelectedIndex(index)}
								onClick={() => handleAction(list[index])}
							>
								{project.title}
							</div>
						))}
					</div>
				</Modal>
			)}
		</>
	)
}

const Modal = ({ children }: PropsWithChildren) => {
	return (
		<div>
			<div className="fixed inset-0 z-40 min-h-screen flex items-center justify-center">
				<div className="w-full max-w-md rounded border-gray-100 shadow-xl overflow-hidden">
					<div className="bg-white p-4">{children}</div>
				</div>
			</div>
			<div className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"></div>
		</div>
	)
}
