import { useState, useEffect } from 'react'
import { EventEmitter } from 'events'
import { motion } from 'framer-motion'
import Header from './Header'
import Content from './Content'
import Section from './Section'

function useProgress (max: number, emitter: EventEmitter) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    function onUpdate (value: number) {
      setValue(Number(((value / max) * 100).toFixed(0)))
    }
    emitter.addListener('update', onUpdate)
    return () => {
      emitter.removeListener('update', onUpdate)
    }
  }, [])

  return value
}

function FixedProgressView ({ progress }: { progress: number }) {
  if (progress < 10) {
    return (
      <span>
        <span
          style={{
            visibility: 'hidden',
          }}
        >
          00
        </span>
        {progress}
      </span>
    )
  }
  if (progress < 100) {
    return (
      <span>
        <span
          style={{
            visibility: 'hidden',
          }}
        >
          0
        </span>
        {progress}
      </span>
    )
  }
  return <>100</>
}

function ProgressBar () {
  const emitter = new EventEmitter()
  const progress = useProgress(100, emitter)

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 20)
      if (count > 100) {
        count = 100
        clearInterval(interval)
      }
      emitter.emit('update', count)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  let color = 'rgb(137, 242, 152)'
  if (progress <= 25) {
    color = 'rgb(237, 103, 94)'
  } else if (progress <= 50) {
    color = 'rgb(244, 248, 168)'
  }

  return (
    <Content>
      <Header />
      <Section>
        <div className="flex items-center">
          <div className="h-5 w-96 mr-3">
            <motion.div
              className="h-full w-0"
              animate={{
                backgroundColor: color,
                width: progress + '%',
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div>
            <FixedProgressView progress={progress} />%
          </div>
        </div>
      </Section>
    </Content>
  )
}

export default ProgressBar
