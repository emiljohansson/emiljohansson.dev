import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'

export default function SignOutPage() {
	useEffect(() => {
		supabaseClient.auth.signOut()
	}, [])

	return (
		<div>
			Success
			<button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
		</div>
	)
}
