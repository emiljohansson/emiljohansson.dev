// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AES, enc } from 'crypto-js'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ data: string }>,
) {
  const bytes = AES.decrypt(req.body.password, req.body.secret)
  try {
    res.status(200).json({
      data: bytes.toString(enc.Utf8),
    })
  } catch (error) {
    res.status(200).json({
      data: '',
    })
  }
}
