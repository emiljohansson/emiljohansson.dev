import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const darkClassName = 'dark'
let savedDarkMode: boolean | undefined

const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState<boolean | undefined>(savedDarkMode)

	useEffect(() => {
		if (darkMode === undefined) {
			setDarkMode(document.documentElement.classList.contains(darkClassName))
			savedDarkMode = document.documentElement.classList.contains(darkClassName)
			return
		}
		localStorage.setItem('theme', darkMode ? darkClassName : '')
		document.documentElement.classList.toggle(darkClassName, localStorage.theme === darkClassName)
		savedDarkMode = document.documentElement.classList.contains(darkClassName)
	}, [darkMode])

	return [darkMode, setDarkMode] as const
}

export const ThemeToggle = () => {
	const [darkMode, setDarkMode] = useDarkMode()

	return (
		<motion.button
			className="dark:text-white absolute right-0 cursor-pointer inline-block p-2 m-3"
			onClick={() => setDarkMode(!darkMode)}
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
