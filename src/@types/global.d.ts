interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  __REACT_DEVTOOLS_GLOBAL_HOOK__: any
}
declare module '*.png' {
  const resource: string
  export = resource
}
declare module '*.svg' {
  const resource: string
  export = resource
}
declare module '*.css' {
  const resource: any
  export = resource
}
declare module '*.scss' {
  const resource: any
  export = resource
}
declare module '*.pcss' {
  const resource: string
  export = resource
}
declare module '*.json' {
  const resource: any
  export = resource
}

declare module '@storybook/react/demo' {
  export class Button extends React.Component<React.HTMLProps<Button>> {
  }

  export interface WelcomeProps {
    showApp: React.MouseEventHandler<Welcome>;
  }

  export class Welcome extends React.Component<WelcomeProps> {
  }
}
