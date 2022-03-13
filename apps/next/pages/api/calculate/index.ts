import type { NextApiRequest, NextApiResponse } from 'next'
import { add } from 'lib/utils/math'

const toNumber = (value: string): number => parseFloat(value)

export default function Math (req: NextApiRequest, res: NextApiResponse) {
  const query = req.body.q as string

  const sum = query.split('+').map(toNumber).reduce(add)

  res.status(200).json({
    query,
    sum,
  })
}
