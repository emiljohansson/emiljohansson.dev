import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { Label } from '@radix-ui/react-label'
import { CheckIcon, Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons'

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
  switch (state) {
    case State.loading:
      return <><span className="sr-only">loading</span><DotsHorizontalIcon /></>
    case State.valid:
      return <><span className="sr-only">valid</span><CheckIcon /></>
    case State.invalid:
      return <><span className="sr-only">invalid</span><Cross2Icon /></>
  }
  return <></>
}

function TwoWayAuthEnter () {
  const [value, setValue] = useState('')
  const [state, setState] = useState(State.idle)
  const inputEl = useRef(null)

  function onChange (event: ChangeEvent<HTMLInputElement>) {
    setState(State.idle)
    const target: HTMLInputElement | null =
      event.target as HTMLInputElement | null
    if (!target) {
      return
    }
    setValue(target.value)
  }

  async function onSubmit (event: FormEvent<HTMLFormElement>) {
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
    <form
      action="#"
      method="POST"
      onSubmit={onSubmit}
      className="flex"
    >
      <div className="flex items-center relative">
        <Label htmlFor="secret" className="pr-3">Enter Code</Label>
        <input id="secret" name="secret" className="input w-80 pr-9" ref={inputEl} onChange={onChange} />
        <span className="absolute right-2.5">
          <EnteredContent state={state} />
        </span>
      </div>
      <button className="btn-primary ml-3">Validate</button>
    </form>
  )
}

export default TwoWayAuthEnter
