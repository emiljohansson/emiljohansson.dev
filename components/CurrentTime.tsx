import { useState } from 'react'
import { styled } from '@/stitches'
import Header from './Header'
import Content from './Content'
import Section from './Section'
import useCurrentTime from '@/lib/useCurrentTime'

const Meridiem = styled('span', {
  fontSize: '50%',
  marginBottom: '-18px',
})

function CurrentTime ({ initialTime }) {
  const [time, setTime] = useState(createTime(initialTime))
  const [meridiem, setMeridiem] = useState(initialTime.meridiem)

  useCurrentTime(({
    hours,
    minutes,
    meridiem,
  }) => {
    setTime(createTime({ hours, minutes }))
    setMeridiem(`${meridiem}`)
  })

  return <>{time}<Meridiem>{meridiem}</Meridiem></>
}

const createTime = ({ hours, minutes }) => `${hours}:${minutes}`

function CurrentTimeBase ({ initialValue }) {
  return (
    <Content>
      <Header />
      <Section size="large">
        <CurrentTime
          initialTime={initialValue}
        />
      </Section>
    </Content>
  )
}

export default CurrentTimeBase
