import { useState } from 'react'
import useCurrentTime from 'lib/hooks/useCurrentTime'
import { Time } from 'types/time'

const createTime = ({
  hours,
  minutes,
}: {
  hours: number
  minutes: string | number
}) => `${hours}:${minutes}`

function CurrentTime ({ initialValue }: { initialValue: Time }) {
  const [time, setTime] = useState<string>(createTime(initialValue))
  const [meridiem, setMeridiem] = useState<string>(initialValue.meridiem)

  useCurrentTime(({ hours, minutes, meridiem }) => {
    setTime(createTime({ hours, minutes }))
    setMeridiem(`${meridiem}`)
  })

  return (
    <>
      <style jsx>{`
        .meridiem {
          margin-bottom: -18px;
        }
      `}</style>

      {time}
      <span className="text-3/6 meridiem">{meridiem}</span>
    </>
  )
}

export default CurrentTime
