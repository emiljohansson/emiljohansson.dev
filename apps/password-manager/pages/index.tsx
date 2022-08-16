import { Label } from '@radix-ui/react-label'
import { createClient } from '@supabase/supabase-js'

export default function HomePage ({ users, accounts }) {
  console.log({ users, accounts })

  return (
    <>
      <h1>Password Manager</h1>
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

export async function getStaticProps () {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  )
  const users = await supabase.from('user').select('*').order('id')
  const accounts = await supabase.from('account').select('*').order('id')

  return {
    props: {
      users,
      accounts,
    },
  }
}
