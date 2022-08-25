import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { AES } from 'crypto-js'
import { Label } from '@radix-ui/react-label'
import randomString from '@emiljohansson/random-string'
import { getUser, supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs'

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (ctx) {
    const { user } = await getUser(ctx)
    const { query } = ctx
    const secret = query.secret as string
    const actualPassword = `${randomString()}-${randomString()}-${randomString()}-${randomString()}`
    const password = AES.encrypt(actualPassword, secret).toString()
    return {
      props: {
        userId: user?.id,
        secret,
        password,
      },
    }
  },
})

const AddAccountPage: NextPage<{ userId: string, secret: string, password: string }> = ({
  userId,
  secret,
  password,
}) => {
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setError('')
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    console.log(formData)

    const { error } = await supabaseClient
      .from('account')
      .insert({
        userId,
        website: formData.website,
        username: formData.username,
        password: formData.password,
      }, {
        returning: 'minimal',
      })
    if (error) {
      setError(error.message)
      return
    }
    router.push({
      pathname: '/accounts',
      query: {
        secret,
      },
    })
  }

  return (
    <>
      <h1>Add Account</h1>
      <form action="/api/add-account" method="post" onSubmit={onSubmit}>
        <input className="input" name="secret" value={secret} type="hidden" />
        <div className="mb-3">
          <Label htmlFor="website" className="block pr-3">Website</Label>
          <input id="website" name="website" className="input" required />
        </div>
        <div className="mb-3">
          <Label htmlFor="username" className="block pr-3">Username</Label>
          <input id="username" name="username" className="input" required />
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

export default AddAccountPage
