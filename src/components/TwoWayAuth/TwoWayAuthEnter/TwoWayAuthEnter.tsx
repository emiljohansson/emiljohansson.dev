import * as React from 'react'
import styled from 'styled-components'
import Header from '../../Header/Header'
import Content from '../../Content/Content'
import Section from '../../Section'

enum State {
  idle,
  loading,
  valid,
  invalid
}

async function post (url: string, body: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
}

function EnteredContent (props: any) {
  const state: State = props.state

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

  return (
    <div>
      {getState()}
    </div>
  )
}

const LocalSection = styled(Section)`
  font-size: 3rem;
  height: 100vh;
  width: 100%;
  text-align: center;
`

function TwoWayAuthEnter () {
  const [ value, setValue ] = React.useState('')
  const [ state, setState ] = React.useState(State.idle)
  const inputEl = React.useRef(null)

  function onChange (event: React.ChangeEvent<HTMLInputElement>): void {
    setState(State.idle)
    const target: HTMLInputElement | null = event.target as HTMLInputElement | null
    if (!target) {
      return
    }
    setValue(target.value)
  }

  async function onSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setState(State.loading)
    try {
      const response: any = await post('/api/two-factor/validate', {
        value
      })
      const json: any = await response.json()
      const data: any = json.data
      // const isValid: boolean = await serverInstance.validate(value)
      const isValid: boolean = data.isValid
      setState(
        isValid
          ? State.valid
          : State.invalid
      )
    } catch (error) {
      setState(State.invalid)
    }
  }

  return (
    <Content>
      <Header />
      <LocalSection>
        <form
          action="#"
          method="POST"
          onSubmit={onSubmit}
        >
          <input
            ref={inputEl}
            className=""
            type="text"
            onChange={onChange}
          />
          <button
            type="submit"
          >
            Validate
          </button>
          <EnteredContent
            state={state}
          />
        </form>
      </LocalSection>
    </Content>
  )
}

export default TwoWayAuthEnter
