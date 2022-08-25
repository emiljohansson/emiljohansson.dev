import { withPageAuth } from '@supabase/auth-helpers-nextjs'

export default function Profile ({ user }) {
  return <div>Hello {user.email}</div>
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
