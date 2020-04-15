import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Header from '../Header/Header'
import Content from '../Content/Content'
import Section from '../Section'

const Meridiem = styled.span`
  font-size: 50%;
  margin-bottom: -18px;
`

function useInterval (callback: () => void, delay: number) {
  const savedCallback: any = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect((): any => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function useCurrentTime (callback: (props: any) => void) {
  useInterval(() => {
    const date: Date = new Date()
    const hours: number = date.getHours()
    const minutes: number = date.getMinutes()
    const isPm: boolean = hours > 12
    const meridiem: string = isPm
      ? 'PM'
      : 'AM'
    const meridiemHours: number = isPm
      ? hours - 12
      : hours
    callback({
      hours: meridiemHours,
      minutes: minutes < 10 ? '0' + minutes : minutes,
      meridiem
    })
  }, 1000)
}

function CurrentTime () {
  const [time, setTime] = useState('00.00')
  const [meridiem, setMeridiem] = useState('')

  useCurrentTime(({
    hours,
    minutes,
    meridiem
  }: any) => {
    setTime(`${hours}:${minutes}`)
    setMeridiem(`${meridiem}`)
  })

  return <span>{time}<Meridiem>{meridiem}</Meridiem></span>
}

function CurrentTimeBase () {
  return (
    <Content>
      <Header />
      <Section>
        <CurrentTime />
      </Section>
    </Content>
  )
}

export default CurrentTimeBase
