import { NowRequest, NowResponse } from '@now/node'
const randomString = require('@emiljohansson/random-string')

let lastUpdated: number = -1
let value: string = ''

export const lifespanInSeconds: number = 15

export function getLastUpdated (): number {
  return lastUpdated
}

export function setLastUpdated (newValue: number): void {
  lastUpdated = newValue
}

export function getValue (): string {
  return value
}

export function setValue (newValue: string): void {
  updateLastUpdated()
  value = newValue
}

function updateLastUpdated (): void {
  lastUpdated = getNewUpdatedTime()
}

function getNewUpdatedTime (): number {
  const date: Date = new Date()
  return date.getTime()
}

export function isWithinTimespan (time: number, seconds: number = 0): boolean {
  return getDiffInSeconds(time) <= seconds
}

export function getDiffInSeconds (time: number): number {
  const lastUpdated: Date = new Date(time)
  const now: Date = new Date()
  const diff: number = (now as any) - (lastUpdated as any)
  return Math.floor(diff / 1000)
}

export default function (req: NowRequest, res: NowResponse) {
  const {
    validate,
    generate
  } = req.query

  if (generate) {
    generateCode(req, res)
    return
  }
  if (req.body) {
    const { value } = req.body

    if (validate && value) {
      validateCode(req, res, value)
      return
    }
  }

  res.status(200).json({
    status: 'success',
    data: null
  })
}

function generateCode (req: NowRequest, res: NowResponse) {
  if (!getLastUpdated() || !isWithinTimespan(getLastUpdated(), lifespanInSeconds)) {
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
      lifespan: lifespanInSeconds
    }
  })
}

function validateCode (req: NowRequest, res: NowResponse, value: string): void {
  function end (isValid: boolean): void {
    res.status(200).json({
      status: 'success',
      data: {
        isValid
      }
    })
  }

  if (!getLastUpdated() || !isWithinTimespan(getLastUpdated(), lifespanInSeconds)) {
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

