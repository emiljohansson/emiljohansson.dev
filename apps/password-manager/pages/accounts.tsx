import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Account } from '../@types/accounts'
import { supabase } from '@/lib/client'
import prisma from '@/lib/prisma'

const AccountsPage: NextPage<{ accounts: Account[], secret: string }> = ({ accounts, secret }) => {
  return (
    <>
      <h1>Accounts</h1>
      <Link href={{
        pathname: '/add-account',
        query: { secret },
      }}>
        <a className="btn-primary">Add account</a>
      </Link>
      <table className='table-auto'>
        <tbody>
          {accounts.map((account, index) => (
            <AccountRow key={index} account={account} secret={secret} />
          ))}
        </tbody>
      </table>
    </>
  )
}

const AccountRow = ({ account, secret }: { account: Account, secret: string }) => {
  const [plaintext, setPlaintext] = useState('')

  const fetchPlaintext = async () => {
    const { data } = await fetch('/api/plaintext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret,
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

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const accounts = await prisma.account.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
    select: {
      password: true,
      website: true,
      username: true,
    },
  })

  return {
    props: {
      accounts,
      secret: query.secret as string,
    },
  }
}
