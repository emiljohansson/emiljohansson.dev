'use client'

import type { Ref } from '@/components/RandomString'

import { useRef, useState } from 'react'
import { RefreshCw, Check, Copy } from 'lucide-react'
import RandomString from '@/components/RandomString'
import { copyToClipboard } from 'lib/utils/string'

export default function Content({ initialValue }: { initialValue: string }) {
	const randomStringRef = useRef<Ref>(null)
	const [copied, setCopied] = useState(false)

	return (
		<>
			<div className="flex gap-2 absolute top-2 right-2">
				<button
					className="btn-outline"
					onClick={() => randomStringRef.current?.generateNewValue()}
					data-test="refresh"
				>
					<RefreshCw width={16} height={16} />
					<span>Refresh</span>
				</button>
				<button
					className="btn-outline"
					onClick={() => {
						copyToClipboard(randomStringRef.current?.getValue() || '')
						setCopied(true)
						setTimeout(() => setCopied(false), 2000)
					}}
					data-test="copy"
				>
					{copied ? (
						<Check width={16} height={16} />
					) : (
						<Copy width={16} height={16} />
					)}
					<span>Copy</span>
				</button>
			</div>
			<h1 className="sr-only">Random string</h1>
			<RandomString ref={randomStringRef} initialValue={initialValue} />
		</>
	)
}
