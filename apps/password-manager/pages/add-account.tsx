import type { GetServerSideProps, NextPage } from 'next'
import randomString from '@emiljohansson/random-string'
import { AES } from 'crypto-js'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

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
        <input name="secret" value={secret} type="hidden" />
        <input name="userId" value={userId} type="hidden" />
        <input name="website" placeholder="website" />
        <input name="username" placeholder="username" />
        <input name="password" value={password} readOnly />
        <button>Add account</button>
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
