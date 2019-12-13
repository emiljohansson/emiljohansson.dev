import * as React from 'react'
import './TwoWayAuthGenerate.scss'
import Header from '../../Header/Header'
import Content from '../../Content/Content'

const name: string = 'TwoWayAuthGenerate'

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
      <section>
        <div className={`${name}__text`}>
          <div>{value}</div>
          <div className={`${name}__bar-container`}>
            <div
              className={`${name}__bar`}
              style={{
                backgroundColor: color,
                width: percentage + '%'
              }}></div>
          </div>
        </div>
      </section>
    </Content>
  )
}

export default TwoWayAuthGenerate
