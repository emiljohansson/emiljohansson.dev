import { Content } from './Content'
import { getProjects } from '@/lib/supabase'

export default async function Page() {
	const projects = await getProjects()
	projects.sort((a, b) => {
		return a.order > b.order ? 1 : -1
	})

	return <Content projects={projects || []} />
}
