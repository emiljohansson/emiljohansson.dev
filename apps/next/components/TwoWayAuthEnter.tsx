import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { styled } from '@/stitches'
import Header from './Header'
import Content from './Content'
import Section from './Section'

enum State {
  idle,
  loading,
  valid,
  invalid,
}

const Input = styled('input', {
  width: '340px',
  textAlign: 'center',
})

async function post(url: string, body: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

function EnteredContent({ state }: { state: State }) {
  function getState(): string {
    switch (state) {
      case State.loading:
        return 'loading'
      case State.valid:
        return 'valid'
      case State.invalid:
        return 'invalid'
    }
    return 'idle'
  }

  return <div>{getState()}</div>
}

function TwoWayAuthEnter() {
  const [value, setValue] = useState('')
  const [state, setState] = useState(State.idle)
  const inputEl = useRef(null)

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setState(State.idle)
    const target: HTMLInputElement | null =
      event.target as HTMLInputElement | null
    if (!target) {
      return
    }
    setValue(target.value)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setState(State.loading)
    try {
      const response: any = await post('/api/two-factor/validate', {
        value,
      })
      const json: any = await response.json()
      const data: any = json.data
      // const isValid: boolean = await serverInstance.validate(value)
      const isValid: boolean = data.isValid
      setState(isValid ? State.valid : State.invalid)
    } catch (error) {
      setState(State.invalid)
    }
  }

  return (
    <Content>
      <Header />
      <Section
        css={{
          textAlign: 'center',
        }}
      >
        <form
          action="#"
          method="POST"
          onSubmit={onSubmit}
          className="flex flex-col"
        >
          <Input ref={inputEl} type="text" onChange={onChange} />
          <button type="submit">Validate</button>
          <EnteredContent state={state} />
        </form>
      </Section>
    </Content>
  )
}

export default TwoWayAuthEnter
