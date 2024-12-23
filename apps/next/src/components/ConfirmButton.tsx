import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface Props {
	duration?: number
	onComfirm: () => void
}

function ConfirmButton({ duration = 3, onComfirm }: Props) {
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (!active) return
		const timer = setInterval(() => {
			onComfirm()
		}, duration * 1000)
		return () => clearInterval(timer)
	}, [active])

	return (
		<button
			className="border-2 rounded relative p-5 overflow-hidden"
			onMouseDown={() => setActive(true)}
			onMouseUp={() => setActive(false)}
		>
			<motion.div
				className="bg-slate-400 absolute h-full w-full top-0 left-0 z-10 origin-left opacity-40"
				animate={{ scaleX: active ? 1 : 0, scaleY: 1, scale: 1 }}
				transition={{ duration: active ? duration : 0 }}
			/>
			<div className="text-3xl relative z-20">Submit Something</div>
		</button>
	)
}

export default ConfirmButton
