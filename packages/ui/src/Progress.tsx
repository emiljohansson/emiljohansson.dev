import { Root, Indicator } from '@radix-ui/react-progress'
import { motion } from 'motion/react'
import { classNames } from '@repo/lib/utils/string'

export const Progress = ({ progress }: { progress: number }) => {
	let colorClass = 'ui-bg-green-400'
	if (progress <= 25) {
		colorClass = 'ui-bg-red-400'
	} else if (progress <= 50) {
		colorClass = 'ui-bg-yellow-200'
	}
	return (
		<Root
			value={progress}
			className="ui-relative ui-overflow-hidden ui-bg-black-rich/50 ui-rounded-full ui-w-96 ui-h-6"
			title="Progress"
		>
			<Indicator asChild className="ui-h-full">
				<motion.div
					className={classNames('ui-h-full ui-w-0', colorClass)}
					animate={{
						width: progress + '%',
					}}
					transition={{ duration: 0.4 }}
				/>
			</Indicator>
		</Root>
	)
}
