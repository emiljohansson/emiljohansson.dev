// import { Children, FC, PropsWithChildren, ReactElement, ReactNode } from 'react'

// const Slot = ({ name, children }: PropsWithChildren<{ name?: string }>) => {
//   console.log(children)

//   if (!name) {
//     return <>{Children.toArray(children).filter(({ props }: ReactElement) => typeof props.slot === 'undefined')}</>
//   }
//   return <>{Children.toArray(children).find(({ props }: ReactElement) => props.slot === name)}</>
// }

// const withSlots = (Component: FC) => {
//   const Wrapper = ({ children, ...rest }: PropsWithChildren) => {
//     const nonSlots: ReactNode[] = []
//     const slotted: ReactNode[] = []
//     Children.forEach(children, (child) => {
//       if (typeof child.slot !== 'undefined') {
//         slotted.push(child)
//       } else {
//         nonSlots.push(child)
//       }
//     })
//     console.log({
//       nonSlots,
//       slotted,
//     })

//     return <Component {...rest}>{nonSlots}</Component>
//   }
//   return Wrapper
// }

// const Container = withSlots(({ children }: PropsWithChildren) => {
//   console.log(children)

//   return (
//     <div className="container">
//       {/* <Con />
//       <Slot /> */}
//       <Slot />
//       {/* <header>
//         <Slot name="header">
//           {children}
//         </Slot>
//       </header>
//       <main>
//         <Slot name="content">
//           {children}
//         </Slot>
//       </main>
//       <footer>
//         <Slot name="footer">
//           {children}
//         </Slot>
//       </footer> */}
//     </div>
//   )
// })

const SlotsPage = () => {
	return (
		<>
			<div>
				<h1>Hello</h1>
			</div>
			<p slot="header">Test 1</p>
			<span slot="content">Test 2</span>
			<div slot="footer">Test 3</div>
			<div>More content</div>
		</>
	)
}

export default SlotsPage
