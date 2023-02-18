import { useState } from 'react'
import ClientItemChild from './ClientItemChild.client'

const ClientItem = () => {
	const [loaded, setLoaded] = useState(false)
	return (
		<div>
			<button onClick={() => setLoaded(true)}>Load child item</button>
			{loaded && <ClientItemChild />}
		</div>
	)
}

export default ClientItem
