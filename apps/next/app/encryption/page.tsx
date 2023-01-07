'use client'

import { useRef, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { AES, enc } from 'crypto-js'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const Encrypt = () => {
  const secretRef = useRef(null)
  const stringRef = useRef(null)
  const [encryptedValue, setEncryptedValue] = useState('')

  function onChange () {
    const secret = secretRef.current.value
    const string = stringRef.current.value
    const encrypted = AES.encrypt(string, secret).toString()
    setEncryptedValue(encrypted)
  }

  return (
    <div className="text-left">
      <h2>Encrypt</h2>
      <div className="grid grid-cols-2-auto gap-2 items-center">
        <Label htmlFor="secret" className="pr-3">Enter Secret</Label>
        <input id="secret" name="secret" className="input w-80 pr-9 ml-auto" ref={secretRef} onChange={onChange} />
        <Label htmlFor="string" className="pr-3">Enter String</Label>
        <input id="string" name="string" className="input w-80 pr-9 ml-auto" ref={stringRef} onChange={onChange} />
        <div>Encrypted:</div>
        <div>{encryptedValue}</div>
      </div>
    </div>
  )
}

const Decrypt = () => {
  const secretRef = useRef(null)
  const stringRef = useRef(null)
  const [decryptedValue, setDecryptedValue] = useState('')

  function onChange () {
    const secret = secretRef.current.value
    const encryptedValue = stringRef.current.value
    const bytes = AES.decrypt(encryptedValue, secret)
    setDecryptedValue(bytes.toString(enc.Utf8))
  }

  return (
    <div className="text-left">
      <h2>Decrypt</h2>
      <div className="grid grid-cols-2-auto gap-2 items-center">
        <Label htmlFor="secret" className="pr-3">Enter Secret</Label>
        <input id="secret" name="secret" className="input w-80 pr-9 ml-auto" ref={secretRef} onChange={onChange} />
        <Label htmlFor="string" className="pr-3">Enter Encrypted Value</Label>
        <input id="string" name="string" className="input w-80 pr-9 ml-auto" ref={stringRef} onChange={onChange} />
        <div>Decrypted:</div>
        <div>{decryptedValue}</div>
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
