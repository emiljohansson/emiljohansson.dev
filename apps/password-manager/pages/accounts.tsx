import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import { Account } from '../@types/accounts'

const Home: NextPage<{ accounts: Account[], secret: string, userId: string }> = ({ accounts, secret, userId }) => {
  return (
    <>
      <h1>Accounts</h1>
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
  const prisma = new PrismaClient()
  const accounts = await prisma.pw_account.findMany({
    where: {
      userId: {
        equals: query.userId as string,
      },
    },
  })

  return {
    props: {
      accounts,
      secret: query.secret as string,
      userId: query.userId as string,
    },
  }
}
