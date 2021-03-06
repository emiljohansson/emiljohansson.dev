import React, { useState, useEffect } from 'react'
import { EventEmitter } from 'events'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { colors } from '../src/styles/variables'
import Header from './Header'
import Content from './Content'
import Section from './Section'

function useProgress (min: number, max: number, emitter: EventEmitter): number {
  const [ value, setValue ] = useState(0)

  useEffect(() => {
    function onUpdate (value: any): void {
      setValue(Number(((value / max) * 100).toFixed(0)))
    }
    emitter.addListener('update', onUpdate)
    return () => {
      emitter.removeListener('update', onUpdate)
    }
  }, [])

  return value
}

function FixedProgressView ({ progress }: any) {
  if (progress < 10) {
    return <span><span style={{
      visibility: 'hidden'
    }}>00</span>{progress}</span>
  }
  if (progress < 100) {
    return <span><span style={{
      visibility: 'hidden'
    }}>0</span>{progress}</span>
  }
  return progress
}

const BarContainer = styled.div`
  border-right: 2px solid ${colors.gray500};
  border-left: 2px solid ${colors.gray500};
  height: 15px;
  width: 400px;
  margin: 0 1rem;
`

const Bar = styled(motion.div)`
  height: 100%;
  width: 0%;
`

function ProgressBar () {
  const emitter: EventEmitter = new EventEmitter()
  const progress: number = useProgress(0, 100, emitter)

  useEffect(() => {
    let count: number = 0
    const interval: any = setInterval(() => {
      count += Math.floor(Math.random() * 20)
      if (count > 100) {
        count = 100
        clearInterval(interval)
      }
      emitter.emit('update', count)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  let color: string = 'rgb(137, 242, 152)'
  if (progress <= 25) {
    color = 'rgb(237, 103, 94)'
  } else if (progress <= 50) {
    color = 'rgb(244, 248, 168)'
  }

  return (
    <Content>
      <Header />
      <Section>
        <BarContainer>
          <Bar
            animate={{
              backgroundColor: color,
              width: progress + '%',
            }}
            transition={{ duration: 0.4 }}
          />
        </BarContainer>
        <div>
          <FixedProgressView
            progress={progress}
          />%
        </div>
      </Section>
    </Content>
  )
}

export default ProgressBar
