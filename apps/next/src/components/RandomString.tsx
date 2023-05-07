import { useState, forwardRef, useImperativeHandle } from 'react'
import randomString from '@emiljohansson/random-string'

interface Props {
	initialValue: string
}

export interface Ref {
	getValue: () => string
	generateNewValue: () => void
}

const RandomString = forwardRef<Ref, Props>(({ initialValue }, ref) => {
	const [value, setValue] = useState(initialValue)

	useImperativeHandle(ref, () => ({
		getValue: () => value,
		generateNewValue: () => {
			setValue(randomString())
		},
	}))

	return <>{value}</>
})

export default RandomString
