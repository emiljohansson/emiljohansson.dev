import type { NextPage } from 'next'
import { Account } from './accounts'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    secret: 'test',
  }),
}).then((res) => res.json())

const Home: NextPage<{ accounts: Account[] }> = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [secret, setSecret] = useState('')

  const fetchAccounts = async () => {
    setAccounts(await fetcher('/api/accounts'))
  }

  return (
    <>
      <h1>Password Manager</h1>
      <input value={secret} onChange={(e) => setSecret(e.target.value)} />
      <button onClick={fetchAccounts}>Load accounts</button>
      {accounts.map((account, index) => (
        <AccountRow key={index} account={account} secret={secret} />
      ))}
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
    <div>
      <p>{account.website}</p>
      <p>{account.username}</p>
      <p onClick={fetchPlaintext}>{account.password}</p>
      <p>{plaintext}</p>
    </div>
  )
}

export default Home
