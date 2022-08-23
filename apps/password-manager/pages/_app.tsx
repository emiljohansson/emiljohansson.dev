import type { AppProps } from 'next/app'
import { AuthProvider, supabase } from 'lib/auth'
import 'shared/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  // const { user, session, error } = await supabase.auth.signIn({
  //   email: 'example@email.com',
  //   password: 'example-password',
  // })
  // console.log({ user, session, error })

  return (
    <AuthProvider supabase={supabase}>
      <main className="">
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  )
}

export default MyApp
