import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

const createClient = () => {
	const cookieStore = cookies()

	return createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value
				},
			},
		},
	)
}

export async function getProjects() {
	const supabase = createClient()
	const { data: projects } = await supabase
		.from('project')
		.select('*')
		.order('id', { ascending: true })
		.eq('enabled', true)
	return projects || []
}
