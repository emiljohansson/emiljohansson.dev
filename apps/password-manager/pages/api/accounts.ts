// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '../../@types/accounts'
import prisma from '../../lib/prisma'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Account[]>,
) {
  const accounts = await prisma.pw_account.findMany({
    where: {
      userId: {
        equals: req.body.userId,
      },
    },
  })

  res.status(200).json(accounts)
}
