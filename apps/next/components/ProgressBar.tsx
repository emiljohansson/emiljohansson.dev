import { useState, useEffect } from 'react'
import Header from './Header'
import Content from './Content'
import Section from './Section'
import { Progress } from '@/shared/Progress'

const useIncrementalProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 20)
      if (count > 100) {
        count = 100
        clearInterval(interval)
      }
      setProgress(Number(((count / 100) * 100).toFixed(0)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return progress
}

function FixedProgressView ({ progress }: { progress: number }) {
  const preZeros = progress < 10 ? '00' : progress < 100 ? '0' : ''
  return (
    <>
      <span
        aria-hidden
        style={{
          visibility: 'hidden',
        }}
      >
        {preZeros}
      </span>
      {progress}%
    </>
  )
}

function ProgressBar () {
  const progress = useIncrementalProgress()

  return (
    <Content>
      <Header />
      <Section>
        <div className="flex items-center">
          <Progress progress={progress} />
          <div className="ml-2">
            <FixedProgressView progress={progress} />
          </div>
        </div>
      </Section>
    </Content>
  )
}

export default ProgressBar
