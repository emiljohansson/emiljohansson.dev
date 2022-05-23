import { Root, Indicator } from '@radix-ui/react-progress'
import { motion } from 'framer-motion'
import { classNames } from 'lib/utils/string'

export const Progress = ({ progress }: { progress: number }) => {
  let colorClass = 'bg-green-400'
  if (progress <= 25) {
    colorClass = 'bg-red-400'
  } else if (progress <= 50) {
    colorClass = 'bg-yellow-200'
  }
  return (
    <Root
      value={progress}
      className="relative overflow-hidden bg-black-rich/50 rounded-full w-96 h-6"
      title="Progress"
    >
      <Indicator
        asChild
        className="h-full"
      >
        <motion.div
          className={classNames('h-full w-0', colorClass)}
          animate={{
            width: progress + '%',
          }}
          transition={{ duration: 0.4 }}
        />
      </Indicator>
    </Root>
  )
}
