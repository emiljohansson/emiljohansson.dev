'use client'

import { type PropsWithChildren, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import useSWR from 'swr'
import { Slider, CheckboxWithLabel } from 'ui'
import { randomString } from 'lib/utils/string'

interface Selection {
	length: number
	numeric: boolean
	symbols: boolean
}

const Trigger = ({ value, children }: PropsWithChildren<{ value: string }>) => (
	<Tabs.Trigger
		value={value}
		className="
      px-5
      mb-4
      h-11
      flex
      flex-1
      items-center
      justify-center
      text-sm
      leading-none
      select-none
      cursor-default
      state-active:border-b-2
      state-active:border-black-rich
    "
	>
		{children}
	</Tabs.Trigger>
)

const fetchWords = async (url: string) => {
	const words = (await (await fetch(url)).json()) as string[]
	return words.join('-')
}

export default function PasswordGeneratorPage() {
	const [randomSelection, setRandomSelection] = useState<Selection>({
		length: 20,
		numeric: false,
		symbols: false,
	})
	const [randomPassword, setRandomPassword] = useState(
		randomString(randomSelection),
	)
	const [numberOfWords, setNumberOfWords] = useState(4)
	const { data: memorablePassword } = useSWR(
		`/api/random-words?words=${numberOfWords}`,
		fetchWords,
	)
	const [pinSelection, setPinSelection] = useState({
		length: 6,
		letters: false,
		numeric: true,
		symbols: false,
	})
	const [pin, setPin] = useState(randomString(pinSelection))

	const onRandomChanged = (values: number[]) => {
		const value = values[0]

		updateRandomSelection({
			...randomSelection,
			length: isNaN(value) ? 1 : value,
		})
	}

	const onNumericToggled = (checked: boolean) => {
		updateRandomSelection({
			...randomSelection,
			numeric: checked,
		})
	}

	const onSymbolsToggled = (checked: boolean) => {
		updateRandomSelection({
			...randomSelection,
			symbols: checked,
		})
	}

	const updateRandomSelection = (newSelection: Selection) => {
		setRandomSelection(newSelection)
		setRandomPassword(randomString(newSelection))
	}

	const onNumberOfWordsChanged = (values: number[]) => {
		const value = values[0]

		setNumberOfWords(isNaN(value) ? 1 : value)
	}

	const onPinLengthChanged = (values: number[]) => {
		const value = values[0]

		const newSelection = {
			...pinSelection,
			length: isNaN(value) ? 1 : value,
		}
		setPinSelection(newSelection)
		setPin(randomString(newSelection))
	}

	return (
		<>
			<h1 className="sr-only">Password Generator</h1>
			<Tabs.Root defaultValue="random-tab" className="flex flex-col w-80">
				<Tabs.List className="flex">
					<Trigger value="random-tab">Random Password</Trigger>
					<Trigger value="memorable-tab">Memorable Password</Trigger>
					<Trigger value="pin-tab">PIN</Trigger>
				</Tabs.List>
				<Tabs.Content value="random-tab">
					<h2>Random password</h2>
					<input
						className="input w-full"
						type="text"
						value={randomPassword}
						readOnly
					/>
					<div className="flex">
						<Slider
							defaultValue={randomSelection.length}
							min={8}
							max={100}
							onValueChange={onRandomChanged}
						/>
						<span className="ml-4">{randomSelection.length}</span>
					</div>
					<fieldset className="grid">
						<CheckboxWithLabel
							labelText="Number"
							checked={randomSelection.numeric}
							onCheckedChange={onNumericToggled}
						/>
						<div className="mx-2"></div>
						<CheckboxWithLabel
							labelText="Symbols"
							checked={randomSelection.symbols}
							onCheckedChange={onSymbolsToggled}
						/>
					</fieldset>
				</Tabs.Content>
				<Tabs.Content value="memorable-tab">
					<h2>Memorable password</h2>
					<input
						className="input w-full"
						type="text"
						value={memorablePassword}
						readOnly
					/>
					<div className="flex">
						<Slider
							defaultValue={numberOfWords}
							min={3}
							max={15}
							onValueChange={onNumberOfWordsChanged}
						/>
						<span className="ml-4">{numberOfWords}</span>
					</div>
				</Tabs.Content>
				<Tabs.Content value="pin-tab">
					<h2>PIN</h2>
					<input className="input w-full" type="text" value={pin} readOnly />
					<div className="flex">
						<Slider
							defaultValue={pinSelection.length}
							min={3}
							max={15}
							onValueChange={onPinLengthChanged}
						/>
						<span className="ml-4">{pinSelection.length}</span>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</>
	)
}
