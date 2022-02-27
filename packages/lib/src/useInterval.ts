import { useEffect, useRef } from 'react'
import noop from './noop'

function useInterval (callback: () => void, delay: number) {
  const savedCallback = useRef(noop)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay === null) return
    function tick () {
      savedCallback.current()
    }
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
