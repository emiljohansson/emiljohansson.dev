import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Content from './Content'
import Section from './Section'

function TwoWayAuthGenerate () {
  const [value, setValue] = useState('')
  const [timeLeft, setTimeLeft] = useState(-1)
  const [lifespan, setLifespan] = useState(-1)

  useEffect(() => {
    if (timeLeft < 0) {
      retrieve()
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  async function retrieve (): Promise<void> {
    try {
      const response = await fetch('/api/two-factor/generate')
      const json = await response.json()
      const data = json.data
      setValue(data.value)
      setTimeLeft(data.expires)
      setLifespan(data.lifespan)
    } catch (error) {
      console.log('error', error)
    }
  }

  const percentage: number = (timeLeft / lifespan) * 100
  let color = 'rgb(137, 242, 152)'
  if (percentage <= 25) {
    color = 'rgb(237, 103, 94)'
  } else if (percentage <= 50) {
    color = 'rgb(244, 248, 168)'
  }

  return (
    <Content>
      <Header />
      <Section direction="column" size="medium">
        <div>{value}</div>
        <div className="h-0.5 w-96 mr-3">
          <motion.div
            className="h-full mx-auto transition-all duration-1000 ease-linear"
            animate={{
              backgroundColor: color,
              width: percentage + '%',
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Section>
    </Content>
  )
}

export default TwoWayAuthGenerate
