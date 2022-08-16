import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Account } from '../@types/accounts'
import prisma from '../lib/prisma'

const Home: NextPage<{ accounts: Account[], secret: string, userId: string }> = ({ accounts, secret, userId }) => {
  return (
    <>
      <h1>Accounts</h1>
      <Link href={{
        pathname: '/add-account',
        query: { secret, userId },
      }}>
        <a className="btn-primary">Add account</a>
      </Link>
      {accounts.map((account, index) => (
        <AccountRow key={index} account={account} secret={secret} userId={userId} />
      ))}
    </>
  )
}

const AccountRow = ({ account, secret, userId }: { account: Account, secret: string, userId: string }) => {
  const [plaintext, setPlaintext] = useState('')

  const fetchPlaintext = async () => {
    const { data } = await fetch('/api/plaintext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret,
        userId,
        password: account.password,
      }),
    }).then((res) => res.json())
    setPlaintext(data)
  }

  return (
    <div>
      <p>{account.website}</p>
      <p>{account.username}</p>
      <p onClick={fetchPlaintext}>{account.password}</p>
      <p>{plaintext}</p>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  )
  const accounts = await supabase
    .from('account')
    .select('*')
    .eq('userId', query.userId)
    .order('id')
  console.log(accounts)

  // const accounts = await prisma.pw_account.findMany({
  //   where: {
  //     userId: {
  //       equals: query.userId as string,
  //     },
  //   },
  // })

  return {
    props: {
      accounts: accounts.data,
      secret: query.secret as string,
      userId: query.userId as string,
    },
  }
}
