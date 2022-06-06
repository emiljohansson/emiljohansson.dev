// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from 'pages/accounts'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Account[]>,
) {
  res.status(200).json([
    {
      website: 'google.com',
      username: 'aa@xx.zz',
      password: 'U2FsdGVkX1/LgNsvWTMG8Pj4vs4OPSwWmnhN2g+2pbs=',
    },
    {
      website: 'twitter.com',
      username: 'bb@xx.zz',
      password: 'U2FsdGVkX1+E832k5D/tYbTO6S+OFcFMa0K4IulxOQZUeXVjKcmWFsBCrDdN2Gfe',
    },
  ])
}
