'use client'

import { useEffect, useMemo, useState } from 'react'
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

export const ThemeToggle = ({
	initValue,
}: {
	initValue: string | undefined
}) => {
	const cookieStore = useCookieStore()
	const [darkMode, setDarkMode] = useState<boolean | undefined>(
		initValue === darkClassName,
	)

	function toggleMode() {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		if (darkMode === undefined) return
		cookieStore.set('theme', darkMode ? darkClassName : '')
		document.documentElement.classList.toggle(darkClassName, darkMode)
	}, [darkMode])

	return (
		<button
			className="
				inline-flex
				items-center
				justify-center
				h-7
				w-7
				ml-auto
				rounded-full
				shadow-thin-border
				shadow-slate-200
				dark:shadow-zinc-700
				hover:bg-slate-50
				hover:dark:bg-zinc-900"
			onClick={() => toggleMode()}
			data-test="toggle-dark-mode"
		>
			<span className="sr-only">Use {darkMode ? 'dark' : 'light'} mode</span>
			{darkMode ? (
				<MoonIcon className="block" width="16" height="16" />
			) : (
				<SunIcon className="block" width="16" height="16" />
			)}
		</button>
	)
}
