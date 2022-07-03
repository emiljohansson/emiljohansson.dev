import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { AES } from 'crypto-js'
import { Label } from '@radix-ui/react-label'
import randomString from '@emiljohansson/random-string'

const fetcher = async (url: string, data: FormData) => await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(Object.fromEntries(data)),
}).then(async (res) => await res.json())

const addAccountPage: NextPage<{ secret: string, userId: string, password: string }> = ({ secret, userId, password }) => {
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const res: { success: boolean, error?: string } = await fetcher(event.currentTarget.action, data)
    console.log(res)
    if (res.success) {
      console.log('success')
      router.push({
        pathname: '/accounts',
        query: {
          secret,
          userId,
        },
      })
      return
    }
    setError(res.error)
  }

  return (
    <>
      <h1>Add Account</h1>
      <form action="/api/add-account" method="post" onSubmit={onSubmit}>
        <input className="input" name="secret" value={secret} type="hidden" />
        <input className="input" name="userId" value={userId} type="hidden" />
        <div className="mb-3">
          <Label htmlFor="website" className="block pr-3">Website</Label>
          <input id="website" name="website" className="input" />
        </div>
        <div className="mb-3">
          <Label htmlFor="username" className="block pr-3">Username</Label>
          <input id="username" name="username" className="input" />
        </div>
        <div className="mb-3">
          <Label htmlFor="username" className="block pr-3">Password</Label>
          <input className="input" name="password" value={password} readOnly />
        </div>
        <button className="btn-primary">Add account</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default addAccountPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const secret = query.secret as string
  const userId = query.userId as string
  const actualPassword = `${randomString()}-${randomString()}-${randomString()}-${randomString()}`
  const password = AES.encrypt(actualPassword, secret).toString()
  return {
    props: {
      secret,
      userId,
      password,
    },
  }
}
