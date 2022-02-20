import { useEffect, useRef } from 'react'
import getCurrentTime from './getCurrentTime'

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

export default function useCurrentTime (callback: (props: {
  hours: number,
  minutes: string | number,
  meridiem: string,
}) => void) {
  useInterval(() => {
    callback(getCurrentTime())
  }, 1000)
}
