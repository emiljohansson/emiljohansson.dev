import { FunctionComponent } from 'react'
import { classNames } from 'lib/src/classNames'

const Section: FunctionComponent<{
  size?: 'normal' | 'large',
  direction?: 'row' | 'column',
}> = ({ children, direction = 'row', size = 'normal' }) => (
  <section className={classNames(
    'flex items-center justify-center h-full',
    {
      'flex-col': direction === 'column',
      'text-3xl': size === 'normal',
      'text-5xl': size === 'large',
    },
  )}>
    {children}
  </section>
)

export default Section
