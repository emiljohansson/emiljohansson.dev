import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './client'

enum Event {
  PasswordRecovery = 'PASSWORD_RECOVERY',
  SignedOut = 'SIGNED_OUT',
  UserUpdated = 'USER_UPDATED',
}

export type ViewType = 'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link' | 'update_password'

interface AuthContext {
  user: User
  session: Session
  view: ViewType
  signOut: () => void
}

export const AuthContext = createContext<AuthContext>({
  session: {} as Session,
  user: {} as User,
  view: 'sign_in',
  signOut: () => supabase.auth.signOut(),
})

export const AuthProvider = ({ ...props }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [view, setView] = useState<ViewType>('sign_in')

  useEffect(() => {
    const activeSession = supabase.auth.session()
    setSession(activeSession)
    setUser(activeSession?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      switch (event) {
        case Event.PasswordRecovery:
          setView('update_password')
          break
        case Event.SignedOut:
        case Event.UserUpdated:
          setView('sign_in')
          break
      }

      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session: currentSession }),
      }).then((res) => res.json())
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        view,
        signOut: () => supabase.auth.signOut(),
      }}
      {...props}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
