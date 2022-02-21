import { useState, useEffect } from 'react'
import { styled } from '@/stitches'
import { motion } from 'framer-motion'

const duration = 3

const Button = styled('button', {
  border: '3px solid black',
  borderRadius: '100px',
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',
})

const ButtonInner = styled(motion.div, {
  background: '#293845',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: 'left',
  zIndex: 1,
})

interface Props {
  onComfirm: () => void
}

function ConfirmButton ({ onComfirm }: Props) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => {
      onComfirm()
    }, duration * 1000)
    return () => clearInterval(timer)
  }, [active])

  return (
    <Button
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <ButtonInner
        animate={{ scaleX: active ? 1 : 0, scaleY: 1, scale: 1 }}
        transition={{ duration: active ? duration : 0 }}
      />
      <div className="text-3xl">Submit Something</div>
    </Button>
  )
}

export default ConfirmButton
