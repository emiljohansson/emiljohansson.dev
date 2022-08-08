import { useEffect, useRef, useState } from 'react'
import { getCurrentTime } from '../utils/date'

function useInterval (callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick () {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default function useCurrentTime () {
  const [time, setTime] = useState(getCurrentTime())

  useInterval(() => {
    setTime(getCurrentTime())
  }, 1000)

  return { ...time }
}
