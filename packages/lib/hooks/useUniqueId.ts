import { useEffect, useState } from 'react'
import { uniqueId } from '../utils/string'

export function useUniqueId() {
	const [id, setId] = useState('')

	useEffect(() => {
		setId(uniqueId())
	}, [])

	return id
}
