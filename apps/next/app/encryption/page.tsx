'use client'

import { useRef, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { AES, enc } from 'crypto-js'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const Encrypt = () => {
	const secretRef = useRef<HTMLInputElement>(null)
	const stringRef = useRef<HTMLInputElement>(null)
	const [encryptedValue, setEncryptedValue] = useState('')

	function onChange() {
		const secret = secretRef.current?.value
		const string = stringRef.current?.value
		console.log({
			secret,
			string
		});
		
		if (!secret || !string) return
		const encrypted = AES.encrypt(string, secret).toString()
		setEncryptedValue(encrypted)
	}

	return (
		<div className="text-left">
			<h2>Encrypt</h2>
			<div className="grid grid-cols-2-auto gap-2 items-center">
				<Label htmlFor="en-secret" className="pr-3">
					Enter Secret
				</Label>
				<input id="en-secret" className="input w-80 pr-9" ref={secretRef} onChange={onChange} />
				<Label htmlFor="en-string" className="pr-3">
					Enter String
				</Label>
				<input id="en-string" className="input w-80 pr-9" ref={stringRef} onChange={onChange} />
				<Label htmlFor="en-result" className="pr-3">
					Encrypted Value
				</Label>
				<input id="en-result" className="input w-80 pr-9" readOnly value={encryptedValue} />
			</div>
		</div>
	)
}

const Decrypt = () => {
	const secretRef = useRef<HTMLInputElement>(null)
	const stringRef = useRef<HTMLInputElement>(null)
	const [decryptedValue, setDecryptedValue] = useState('')

	function onChange() {
		const secret = secretRef.current?.value
		const encryptedValue = stringRef.current?.value
		console.log({
			secret,
			encryptedValue
		});
		
		if (!secret || !encryptedValue) return
		const bytes = AES.decrypt(encryptedValue, secret)
		setDecryptedValue(bytes.toString(enc.Utf8))
	}

	return (
		<div className="text-left">
			<h2>Decrypt</h2>
			<div className="grid grid-cols-2-auto gap-2 items-center">
				<Label htmlFor="de-secret" className="pr-3">
					Enter Secret
				</Label>
				<input id="de-secret" className="input w-80 pr-9" ref={secretRef} onChange={onChange} />
				<Label htmlFor="de-string" className="pr-3">
					Enter Encrypted Value
				</Label>
				<input id="de-string" className="input w-80 pr-9" ref={stringRef} onChange={onChange} />
				<Label htmlFor="de-result" className="pr-3">
					Decrypted Value
				</Label>
				<input id="de-result" className="input w-80 pr-9" readOnly value={decryptedValue} />
			</div>
		</div>
	)
}

const EncryptionPage = () => {
	return (
		<Content>
			<Header />
			<Section>
				<div className="grid lg:grid-cols-2 gap-8">
					<Encrypt />
					<Decrypt />
				</div>
			</Section>
		</Content>
	)
}

export default EncryptionPage
