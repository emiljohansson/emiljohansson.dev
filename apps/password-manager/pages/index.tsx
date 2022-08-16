import { Label } from '@radix-ui/react-label'
import { useSession, signIn, signOut } from 'next-auth/react'

function Component () {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

const HomePage = () => {
  return (
    <>
      <h1>Password Manager</h1>
      <Component />
      <form action="/accounts" method="get">
        <div className="mb-3">
          <Label htmlFor="secret" className="block pr-3">Secret</Label>
          <input id="secret" name="secret" className="input" />
        </div>
        <div className="mb-3">
          <Label htmlFor="userId" className="block pr-3">User ID</Label>
          <input id="userId" name="userId" className="input" />
        </div>
        <button className="btn-primary">Load accounts</button>
      </form>
    </>
  )
}

export default HomePage
