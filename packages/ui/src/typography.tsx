'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/utils'

type VariantKey = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

const typographyVariants = cva('', {
	variants: {
		variant: {
			p: 'ui-leading-7 [&:not(:first-child)]:ui-mt-6', // paragraph
			h1: 'ui-scroll-m-20 ui-text-4xl ui-font-extrabold ui-tracking-tight lg:ui-text-5xl',
			h2: 'ui-scroll-m-20 ui-border-b ui-pb-2 ui-text-3xl ui-font-semibold ui-tracking-tight ui-mt-10 first:ui-mt-0',
		},
	},
	defaultVariants: {
		variant: 'p',
	},
})

export interface TypographyProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof typographyVariants> {
	as?: VariantKey
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	({ className, variant, as, ...props }) => {
		const Comp = as || variant || 'p'
		return (
			<Comp
				className={cn(typographyVariants({ variant, className }))}
				{...props}
			/>
		)
	},
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }
