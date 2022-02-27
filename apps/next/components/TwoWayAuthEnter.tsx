import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import Header from './Header'
import Content from './Content'
import Section from './Section'

enum State {
  idle,
  loading,
  valid,
  invalid,
}

async function post (url: string, body: unknown) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

function EnteredContent ({ state }: { state: State }) {
  function getState (): string {
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

  return <div className="text-center">{getState()}</div>
}

function TwoWayAuthEnter () {
  const [value, setValue] = useState('')
  const [state, setState] = useState(State.idle)
  const inputEl = useRef(null)

  function onChange (event: ChangeEvent<HTMLInputElement>): void {
    setState(State.idle)
    const target: HTMLInputElement | null =
      event.target as HTMLInputElement | null
    if (!target) {
      return
    }
    setValue(target.value)
  }

  async function onSubmit (event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setState(State.loading)
    try {
      const response = await post('/api/two-factor/validate', {
        value,
      })
      const json = await response.json()
      const data = json.data
      // const isValid: boolean = await serverInstance.validate(value)
      const isValid: boolean = data.isValid
      setState(isValid ? State.valid : State.invalid)
    } catch (error) {
      setState(State.invalid)
    }
  }

  return (
    <Content>
      <style jsx>{`
        .input {
          width: '340px',
        }
      `}</style>
      <Header />
      <Section>
        <form
          action="#"
          method="POST"
          onSubmit={onSubmit}
          className="flex flex-col"
        >
          <input ref={inputEl} className="text-center input" type="text" onChange={onChange} />
          <button type="submit">Validate</button>
          <EnteredContent state={state} />
        </form>
      </Section>
    </Content>
  )
}

export default TwoWayAuthEnter
