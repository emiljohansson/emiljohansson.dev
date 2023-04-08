'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const darkClassName = 'dark'

function cookies() {
	const cookieStore = new Map()
	const cookieString = typeof document !== 'undefined' ? document.cookie : ''
	const cookieArray = cookieString.split(';')
	cookieArray.forEach((cookie) => {
		const [key, value] = cookie.split('=')
		cookieStore.set(key.trim(), value)
	})
	return {
		get(key: string) {
			return {
				key,
				value: cookieStore.get(key),
			}
		},
		set(key: string, value: string) {
			document.cookie = `${key}=${value}`
		},
		has(key: string) {
			return cookieStore.has(key)
		},
	}
}

function useCookieStore() {
	const cookieStore = useMemo(() => cookies(), [])
	return cookieStore
}

export const ThemeToggle = () => {
	const cookieStore = useCookieStore()
	const [darkMode, setDarkMode] = useState<boolean | undefined>()

	function toggleMode() {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		if (darkMode === undefined) {
			setDarkMode(cookieStore.get('theme')?.value)
			return
		}
		cookieStore.set('theme', darkMode ? darkClassName : '')
		document.documentElement.classList.toggle(darkClassName, darkMode)
	}, [darkMode])

	return (
		<motion.button
			className="dark:text-white absolute right-0 cursor-pointer inline-block p-2 m-3"
			onClick={() => toggleMode()}
			data-test="toggle-dark-mode"
		>
			<motion.div
				initial={{
					scale: darkMode === undefined ? 0.5 : 1,
					opacity: darkMode === undefined ? 0 : 1,
					y: darkMode === undefined ? '-100%' : 0,
				}}
				animate={{
					scale: darkMode === undefined ? 0.5 : 1,
					opacity: darkMode === undefined ? 0 : 1,
					y: darkMode === undefined ? '-100%' : 0,
				}}
				transition={{ duration: 0.5, delay: 0.5 }}
			>
				<span className="sr-only">Use {darkMode ? 'dark' : 'light'} mode</span>
				{darkMode ? (
					<MoonIcon className="block" width="24" height="24" />
				) : (
					<SunIcon className="block" width="24" height="24" />
				)}
			</motion.div>
		</motion.button>
	)
}
