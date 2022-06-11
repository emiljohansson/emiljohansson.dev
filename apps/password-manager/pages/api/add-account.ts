// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean, error?: string }>,
) {
  const body = req.body
  try {
    const user = await prisma.pw_user.findFirst({
      where: {
        uid: body.userId,
      },
    })
    console.log(user)
    if (!user) {
      throw new Error('User not found')
    }

    await prisma.pw_account.create({
      data: {
        userId: body.userId,
        website: body.website,
        username: body.username,
        password: body.password,
      },
    })
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Request error', error.message)
    res.status(500).json({ error: 'Error creating account', success: false })
  }
}
