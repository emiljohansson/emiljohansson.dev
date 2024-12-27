import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

const createClient = async () => {
	const cookieStore = await cookies()

	return createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll()
				},
			},
		},
	)
}

export async function getProjects() {
	const supabase = await createClient()
	const { data: projects } = await supabase
		.from('project')
		.select('*')
		.order('id', { ascending: true })
		.eq('enabled', true)
	return projects || []
}
