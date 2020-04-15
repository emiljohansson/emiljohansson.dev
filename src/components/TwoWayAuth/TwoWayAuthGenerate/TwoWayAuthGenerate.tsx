import * as React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Header from '../../Header/Header'
import Content from '../../Content/Content'
import Section from '../../Section'

const ColumnSection = styled(Section)`
  flex-direction: column;
`

const BarContainer = styled.div`
  height: 2px;
  width: 400px;
`

const Bar = styled(motion.div)`
  height: 100%;
  margin: 0 auto;
  transition: all 1s linear;
`

function TwoWayAuthGenerate () {
  const [ value, setValue ] = React.useState('')
  const [ timeLeft, setTimeLeft ] = React.useState(-1)
  const [ lifespan, setLifespan ] = React.useState(-1)

  React.useEffect(() => {
    if (timeLeft < 0) {
      retrieve()
    }
    const timer: any = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  async function retrieve (): Promise<void> {
    try {
      const response: any = await fetch('/api/two-factor/generate')
      const json: any = await response.json()
      const data: any = json.data
      setValue(data.value)
      setTimeLeft(data.expires)
      setLifespan(data.lifespan)
    } catch (error) {
      console.log('error', error)
    }
  }

  const percentage: number = (timeLeft / lifespan) * 100
  let color: string = 'rgb(137, 242, 152)'
  if (percentage <= 25) {
    color = 'rgb(237, 103, 94)'
  } else if (percentage <= 50) {
    color = 'rgb(244, 248, 168)'
  }

  return (
    <Content>
      <Header />
      <ColumnSection>
        <div>{value}</div>
        <BarContainer>
          <Bar
            animate={{
              backgroundColor: color,
              width: percentage + '%',
            }}
            transition={{ duration: 0.4 }}
          />
        </BarContainer>
      </ColumnSection>
    </Content>
  )
}

export default TwoWayAuthGenerate
