import React, { useState, useEffect } from 'react'
import { EventEmitter } from 'events'
import { motion } from 'framer-motion'
import './ProgressBar.scss'
import Header from '../Header/Header'
import Content from '../Content/Content'

const name: string = 'ProgressBar'

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
      <section className={`${name}__text`}>
        <div className={`${name}__bar-container`}>
          <motion.div
            className={`${name}__bar`}
            animate={{
              backgroundColor: color,
              width: progress + '%',
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div>
          <FixedProgressView
            progress={progress}
          />%
        </div>
      </section>
    </Content>
  )
}

export default ProgressBar
