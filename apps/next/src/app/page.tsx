import type { Project } from './types'

import { sql } from '@vercel/postgres'
import { Content } from './Content'

export default async function Page() {
	const { rows: projects } = await sql<Project>`select * from projects`

	return <Content projects={projects} />
}
