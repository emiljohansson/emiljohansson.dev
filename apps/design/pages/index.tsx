import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { BorderSolidIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'
import { motion } from 'framer-motion'
import {
	Select,
	SelectGroup,
	SelectLabel,
	SelectItem,
	SelectSeparator,
} from 'shared/Select'
import { Progress } from 'shared/Progress'
import { ThemeToggle } from 'shared/ThemeToggle'
import { Slider } from 'shared/Slider'
import { CheckboxWithLabel } from 'shared/CheckboxWithLabel'

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

			<header className="h-10">
				<ThemeToggle />
			</header>

			<main className="flex flex-col gap-4 pb-52">
				<article>
					<h1>Components / Design System</h1>
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
					<h2>Typography</h2>
					<h1>Heading 1</h1>
					<h2>Heading 2</h2>
				</article>
				<article>
					<h2>Button</h2>
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
					<h2>Link</h2>
					<Link href="/" className="link">
						Simple link
					</Link>
				</article>
				<article>
					<h2>Input</h2>
					<div className="flex items-center">
						<Label htmlFor="input1" className="pr-3">
							First Name
						</Label>
						<input id="input1" className="input" placeholder="Default" />
					</div>
				</article>
				<article>
					<h2>Checkbox</h2>
					<CheckboxWithLabel labelText="Accept terms and conditions." />
				</article>
				<article>
					<h2>Radio Group</h2>
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
					<h2>Select</h2>
					<Select defaultValue="apple">
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</Select>
					<br />
					<Select defaultValue="blueberry">
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
							<SelectItem value="blueberry">Blueberry</SelectItem>
							<SelectItem value="grapes">Grapes</SelectItem>
							<SelectItem value="pineapple">Pineapple</SelectItem>
						</SelectGroup>

						<SelectSeparator />

						<SelectGroup>
							<SelectLabel>Vegetables</SelectLabel>
							<SelectItem value="aubergine">Aubergine</SelectItem>
							<SelectItem value="broccoli">Broccoli</SelectItem>
							<SelectItem value="carrot" disabled>
								Carrot
							</SelectItem>
							<SelectItem value="courgette">Courgette</SelectItem>
							<SelectItem value="leek">Leek</SelectItem>
						</SelectGroup>

						<SelectSeparator />

						<SelectGroup>
							<SelectLabel>Meat</SelectLabel>
							<SelectItem value="beef">Beef</SelectItem>
							<SelectItem value="chicken">Chicken</SelectItem>
							<SelectItem value="lamb">Lamb</SelectItem>
							<SelectItem value="pork">Pork</SelectItem>
						</SelectGroup>
					</Select>
				</article>
				<article>
					<h2>Progress</h2>
					<div className="flex items-center">
						<Progress progress={42} />
						{/* <div className="flex items-center h-14 p-6 mx-auto rounded bg-gradient-to-r from-purple-700 to-primary">
            </div> */}
					</div>
				</article>
				<article>
					<h2>Animated Menu</h2>
					<Toggle />
				</article>
				<article>
					<h2>Slider</h2>
					<Slider defaultValue={50} max={100} label="Volume" />
				</article>
			</main>
		</>
	)
}

export default Home
