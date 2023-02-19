import { useState } from 'react'

const ClientItem = () => {
	const [count, setCount] = useState(0)
	return <div onClick={() => setCount(count + 1)}>Client item {count}</div>
}

export default ClientItem
