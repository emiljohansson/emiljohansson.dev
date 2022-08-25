import { Auth } from '@supabase/ui'
import { getUser, supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export const getServerSideProps = withPageAuth({
  authRequired: false,
  async getServerSideProps (ctx) {
    // Access the user object
    const { user, error } = await getUser(ctx)
    // Run queries with RLS on the server
    if (user) {
      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        },
      }
    }
    return {
      props: {
        errorMessage: error?.message ?? null,
      },
    }
  },
})

export default function LoginPage ({ errorMessage }: { errorMessage?: string}) {
  const router = useRouter()
  const { user } = useUser()

  if (user) router.push('/profile')

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <Auth
        supabaseClient={supabaseClient}
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />
    </>
  )
}
