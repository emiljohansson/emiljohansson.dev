import type { NextApiRequest, NextApiResponse } from 'next'
import randomString from '@emiljohansson/random-string'

let lastUpdated = -1
let value = ''

const lifespanInSeconds = 15

function getLastUpdated () {
  return lastUpdated
}

function getValue () {
  return value
}

function setValue (newValue: string) {
  updateLastUpdated()
  value = newValue
}

function updateLastUpdated () {
  lastUpdated = getNewUpdatedTime()
}

function getNewUpdatedTime () {
  const date: Date = new Date()
  return date.getTime()
}

function isWithinTimespan (time: number, seconds = 0) {
  return getDiffInSeconds(time) <= seconds
}

function getDiffInSeconds (time: number) {
  const lastUpdated: Date = new Date(time)
  const now: Date = new Date()
  const diff: number = (now as any) - (lastUpdated as any)
  return Math.floor(diff / 1000)
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { fn } = req.query

  if (fn === 'generate') {
    generateCode(req, res)
    return
  }
  if (req.body) {
    const { value } = req.body

    if (fn === 'validate' && value) {
      validateCode(req, res, value)
      return
    }
  }

  res.status(200).json({
    status: 'success',
    data: null,
  })
}

function generateCode (req: NextApiRequest, res: NextApiResponse) {
  if (
    !getLastUpdated() ||
    !isWithinTimespan(getLastUpdated(), lifespanInSeconds)
  ) {
    setValue('')
  }
  if (!getValue()) {
    setValue(randomString())
  }
  res.status(200).json({
    status: 'success',
    data: {
      value: getValue(),
      expires: lifespanInSeconds - getDiffInSeconds(getLastUpdated()),
      lifespan: lifespanInSeconds,
    },
  })
}

function validateCode (
  req: NextApiRequest,
  res: NextApiResponse,
  value: string,
): void {
  function end (isValid: boolean): void {
    res.status(200).json({
      status: 'success',
      data: {
        isValid,
      },
    })
  }

  if (
    !getLastUpdated() ||
    !isWithinTimespan(getLastUpdated(), lifespanInSeconds)
  ) {
    end(false)
    return
  }
  if (!getValue()) {
    end(false)
    return
  }
  const isValid: boolean = value === getValue()
  if (isValid) {
    setValue('')
  }
  end(isValid)
}
