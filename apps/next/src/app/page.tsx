import { Content } from './Content'
import { getProjects } from '@/lib/supabase'

export default async function Page() {
	const projects = await getProjects()

	return <Content projects={projects || []} />
}
