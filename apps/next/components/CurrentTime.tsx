import { useState } from 'react'
import Header from './Header'
import Content from './Content'
import Section from './Section'
import useCurrentTime from 'lib/src/useCurrentTime'
import { Time } from 'src/@types/time'

const createTime = ({ hours, minutes }) => `${hours}:${minutes}`

function CurrentTime ({ initialTime }: { initialTime: Time }) {
  const [time, setTime] = useState<string>(createTime(initialTime))
  const [meridiem, setMeridiem] = useState<string>(initialTime.meridiem)

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

function CurrentTimeBase ({ initialValue }: { initialValue: Time }) {
  return (
    <Content>
      <Header />
      <Section size="large">
        <CurrentTime initialTime={initialValue} />
      </Section>
    </Content>
  )
}

export default CurrentTimeBase
