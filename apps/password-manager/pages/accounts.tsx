import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Account } from '../@types/accounts'
import prisma from '../lib/prisma'

const AccountsPage: NextPage<{ accounts: Account[], secret: string, userId: string }> = ({ accounts, secret, userId }) => {
  return (
    <>
      <h1>Accounts</h1>
      <Link href={{
        pathname: '/add-account',
        query: { secret, userId },
      }}>
        <a className="btn-primary">Add account</a>
      </Link>
      <table className='table-auto'>
        {accounts.map((account, index) => (
          <AccountRow key={index} account={account} secret={secret} userId={userId} />
        ))}
      </table>
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
    <tr>
      <td>{account.website}</td>
      <td>{account.username}</td>
      <td onClick={fetchPlaintext}>{account.password.substring(0, 15)}...</td>
      <td>{plaintext}</td>
    </tr>
  )
}

export default AccountsPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const accounts = await prisma.account.findMany({
    where: {
      userId: {
        equals: query.userId as string,
      },
    },
    select: {
      password: true,
      website: true,
      username: true,
    },
  })
  console.log(accounts)

  return {
    props: {
      accounts,
      secret: query.secret as string,
      userId: query.userId as string,
    },
  }
}
