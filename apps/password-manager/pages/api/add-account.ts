// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { createClient } from '@supabase/supabase-js'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean, error?: string }>,
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  )

  const body = req.body
  try {
    const user = await supabase
      .from('user')
      .select('*')
      .eq('uid', body.userId)
      .single()
    // const user = await prisma.pw_user.findFirst({
    //   where: {
    //     uid: body.userId,
    //   },
    // })
    console.log('id', body.userId)
    console.log(user)
    if (!user) {
      throw new Error('User not found')
    }

    await supabase
      .from('account')
      .insert({
        userId: body.userId,
        website: body.website,
        username: body.username,
        password: body.password,
      })
      // .from('user')
      // .select('*')
      // .eq('uid', body.userId)
      // .single()

    // await prisma.pw_account.create({
    //   data: {
    //     userId: body.userId,
    //     website: body.website,
    //     username: body.username,
    //     password: body.password,
    //   },
    // })
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Request error', error.message)
    res.status(500).json({ error: 'Error creating account', success: false })
  }
}
