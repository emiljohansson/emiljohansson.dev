'use client'

import type { NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { BorderSolidIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'
import { motion } from 'motion/react'
import {
	Select,
	SelectGroup,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	Progress,
	Slider,
	CheckboxWithLabel,
} from '@repo/ui'

const RadioGroup = RadioGroupPrimitive.Root
const RadioGroupRadio = RadioGroupPrimitive.Item
const RadioGroupIndicator = RadioGroupPrimitive.Indicator

/*
colors:
orange: #DE6449
tart orange: #fe4a49
Yellow: #fed766
richblack: #131B23
alice blue #e9f1f7
start command blue: #2274a5
eggshell: #e7dfc6

grays:
light gray: #f4f4f8
gray: #e6e6ea
dark gray: #383838
*/

interface Option {
	value: string
	title: string
	disabled?: true
}

const fruits: Option[] = [
	{ value: 'apple', title: 'Apple' },
	{ value: 'banana', title: 'Banana' },
	{ value: 'orange', title: 'Orange' },
	{ value: 'pear', title: 'Pear' },
	{ value: 'grapes', title: 'Grapes' },
	{ value: 'pineapple', title: 'Pineapple' },
]
const vegetables: Option[] = [
	{ value: 'aubergine', title: 'Aubergine' },
	{ value: 'broccoli', title: 'Broccoli' },
	{ value: 'carrot', title: 'Carrot', disabled: true },
	{ value: 'courgette', title: 'Courgette' },
	{ value: 'leek', title: 'Leek' },
]
const meats: Option[] = [
	{ value: 'beef', title: 'Beef' },
	{ value: 'chicken', title: 'Chicken' },
	{ value: 'lamb', title: 'Lamb' },
	{ value: 'pork', title: 'Pork' },
]

const MotionLine = motion(BorderSolidIcon)
const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 20,
}

const Toggle = () => {
	const [selected, setSelected] = useState(false)

	function toggle() {
		setSelected(!selected)
	}

	return (
		<button className="relative h-6 w-6 text-black" onClick={toggle}>
			<MotionLine
				width="24"
				height="24"
				className="absolute"
				animate={{
					rotate: selected ? 45 : 0,
					top: selected ? '0px' : '2.5px',
				}}
				transition={spring}
				layout
			/>
			<MotionLine
				width="24"
				height="24"
				className="absolute"
				animate={{
					rotate: selected ? -45 : 0,
					top: selected ? '0px' : '-2.5px',
				}}
				transition={spring}
				layout
			/>
		</button>
	)
}

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Design System</title>
				<meta name="description" content="emil johansson design system" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="h-10">{/* <ThemeToggle /> */}</header>

			<main className="flex flex-col gap-4 pb-52">
				<article>
					<h1 className="heading1">Components / Design System</h1>
					<p>
						For years parents have espoused the health benefits of eating garlic
						bread with cheese to their children, with the food earning such an
						iconic status in our culture that kids will often dress up as warm,
						cheesy loaf for Halloween.
					</p>
					<p>
						But a recent study shows that the celebrated appetizer may be linked
						to a series of rabies cases springing up around the country.
					</p>
				</article>
				<article>
					<h2 className="heading2">Typography</h2>
					<h1 className="heading1">Heading 1</h1>
					<h2 className="heading2">Heading 2</h2>
				</article>
				<article>
					<h2 className="heading2">Button</h2>
					<div className="mb-3">
						<button className="btn-primary mr-3">Button</button>
						<Link href="/" className="btn-primary mr-3" role="button">
							Link
						</Link>
					</div>
					<div>
						<button className="btn-secondary mr-3">Button</button>
						<Link href="/" className="btn-secondary mr-3" role="button">
							Link
						</Link>
					</div>
				</article>
				<article>
					<h2 className="heading2">Link</h2>
					<Link href="/" className="link">
						Simple link
					</Link>
				</article>
				<article>
					<h2 className="heading2">Input</h2>
					<div className="flex items-center">
						<Label htmlFor="input1" className="pr-3">
							First Name
						</Label>
						<input id="input1" className="input" placeholder="Default" />
					</div>
				</article>
				<article>
					<h2 className="heading2">Checkbox</h2>
					<CheckboxWithLabel labelText="Accept terms and conditions." />
				</article>
				<article>
					<h2 className="heading2">Radio Group</h2>
					<RadioGroup defaultValue="default">
						<div className="flex items-center mb-2">
							<RadioGroupRadio
								className="bg-white cursor-default w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-gray-50"
								value="default"
								id="r1"
							>
								<RadioGroupIndicator
									className="
                  flex
                  items-center
                  justify-center
                  w-full
                  h-full
                  relative
                  cursor-default

                  after:block
                  after:w-2/4
                  after:h-2/4
                  after:rounded-full
                  after:bg-primary
                "
								/>
							</RadioGroupRadio>
							<label className="pl-3" htmlFor="r1">
								Default
							</label>
						</div>
						<div className="flex items-center mb-2">
							<RadioGroupRadio
								className="bg-white cursor-default w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-gray-50"
								value="test"
								id="r2"
							>
								<RadioGroupIndicator
									className="
                  flex
                  items-center
                  justify-center
                  w-full
                  h-full
                  relative

                  after:block
                  after:w-2/4
                  after:h-2/4
                  after:rounded-full
                  after:bg-primary
                "
								/>
							</RadioGroupRadio>
							<label className="pl-3" htmlFor="r2">
								Compact
							</label>
						</div>
					</RadioGroup>
				</article>
				<article>
					<h2 className="heading2">Select</h2>
					<Select defaultValue="apple" options={fruits}>
						{fruits.map(({ value, title, disabled }) => (
							<SelectItem key={value} value={value} disabled={disabled}>
								{title}
							</SelectItem>
						))}
					</Select>
					<br />
					<Select
						defaultValue="banana"
						options={[...fruits, ...vegetables, ...meats]}
					>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							{fruits.map(({ value, title, disabled }) => (
								<SelectItem key={value} value={value} disabled={disabled}>
									{title}
								</SelectItem>
							))}
						</SelectGroup>

						<SelectSeparator />

						<SelectGroup>
							<SelectLabel>Vegetables</SelectLabel>
							{vegetables.map(({ value, title, disabled }) => (
								<SelectItem key={value} value={value} disabled={disabled}>
									{title}
								</SelectItem>
							))}
						</SelectGroup>

						<SelectSeparator />

						<SelectGroup>
							<SelectLabel>Meat</SelectLabel>
							{meats.map(({ value, title, disabled }) => (
								<SelectItem key={value} value={value} disabled={disabled}>
									{title}
								</SelectItem>
							))}
						</SelectGroup>
					</Select>
				</article>
				<article>
					<h2 className="heading2">Progress</h2>
					<div className="flex items-center">
						<Progress progress={42} />
						{/* <div className="flex items-center h-14 p-6 mx-auto rounded bg-gradient-to-r from-purple-700 to-primary">
            </div> */}
					</div>
				</article>
				<article>
					<h2 className="heading2">Animated Menu</h2>
					<Toggle />
				</article>
				<article>
					<h2 className="heading2">Slider</h2>
					<Slider defaultValue={50} max={100} label="Volume" />
				</article>
			</main>
		</>
	)
}

export default Home
