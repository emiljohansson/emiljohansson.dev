'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Project } from './types'

export function HeaderCurrentProject({
	projects,
	initProject,
}: {
	projects: Project[]
	initProject?: Project
}) {
	const pathname = usePathname()
	const [currentProject, setCurrentProject] = useState<Project | undefined>(
		initProject,
	)

	useEffect(() => {
		const currentProject = projects.find((project) => project.href === pathname)
		setCurrentProject(currentProject)
	}, [pathname])

	if (!currentProject) return null

	return (
		<>
			<span className="text-gray-300">/</span>
			<span>{currentProject.title}</span>
		</>
	)
}
