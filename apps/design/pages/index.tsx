import type { NextPage } from 'next'
import Head from 'next/head'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

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

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <article className="prose lg:prose-xl dark:prose-invert"> */}
        <article>
          <h1>Components / Design System</h1>
          <p>
            For years parents have espoused the health benefits of eating garlic bread with cheese to their
            children, with the food earning such an iconic status in our culture that kids will often dress
            up as warm, cheesy loaf for Halloween.
          </p>
          <p>
            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
            springing up around the country.
          </p>
        </article>
        <article>
          <h2>Typography</h2>
          <p className="h1">Heading 1</p>
          <p className="h2">Heading 2</p>
          <p className="h3">Heading 3</p>
          <p className="h4">Heading 4</p>
        </article>
        <article>
          <h2>Checkbox</h2>
          <div className="flex items-center">
            <CheckboxPrimitive.Root className="bg-white w-6 h-6 rounded flex items-center justify-center shadow" defaultChecked id="c1">
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="text-orange" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <label className="pl-3" htmlFor="c1">
              Accept terms and conditions.
            </label>
          </div>
        </article>
        <article>
          <h2>Radio Group</h2>
          <RadioGroup defaultValue="default">
            <div className="flex items-center mb-2">
              <RadioGroupRadio
                className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow"
                value="default"
                id="r1"
              >
                <RadioGroupIndicator className="
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
                  after:bg-orange
                " />
              </RadioGroupRadio>
              <label
                className="pl-3"
                htmlFor="r1"
              >Default</label>
            </div>
            <div className="flex items-center mb-2">
              <RadioGroupRadio
                className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow"
                value="test"
                id="r2"
              >
                <RadioGroupIndicator className="
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
                  after:bg-orange
                " />
              </RadioGroupRadio>
              <label
                className="pl-3"
                htmlFor="r2"
              >Compact</label>
            </div>
          </RadioGroup>
        </article>
      </main>
    </>
  )
}

export default Home
