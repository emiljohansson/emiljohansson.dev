import type { NextApiRequest, NextApiResponse } from 'next'

const toNumber = (value: string): number => parseFloat(value)
const add = (a: number, b: number) => a + b

export default function Math (req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q as string

  const sum = query.split('+').map(toNumber).reduce(add)

  res.end(`${req.query.q}=${sum}`)
}
