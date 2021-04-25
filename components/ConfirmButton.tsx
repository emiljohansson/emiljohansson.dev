import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const relative = css({
  position: 'relative',
})

// const fontSize = css({
//   fontSize: ${this.prop},
// })

const duration = 3

const Button = styled.button({
  border: '3px solid black',
  borderRadius: '100px',
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',

  '&:focus': {
    outline: 'none'
  }
})

const ButtonInner = styled(motion.div)({
  background: '#293845',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: 'left',
  zIndex: 1,
})

const ButtonText = styled.div({
  // relative,
  fontSize: '1.7rem',
  zIndex: 2,
})

interface Props {
  onComfirm: () => void
}

function ConfirmButton ({
  onComfirm
}: Props) {
  const [ active, setActive ] = useState(false)

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => {
      onComfirm()
    }, duration * 1000);
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
      <ButtonText>Submit Something</ButtonText>
    </Button>
  )
}

export default ConfirmButton
