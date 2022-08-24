import { supabase } from '@/lib/client'

export default function SignOutPage () {
  supabase.auth.signOut()

  return <div>Success</div>
}
