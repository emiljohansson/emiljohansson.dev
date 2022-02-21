export const classNames = (...args: (string | { [key: string]: boolean })[]) => {
  const classes: string[] = []
  for (const arg of args) {
    if (typeof arg === 'string') {
      classes.push(arg)
    } else {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(' ')
}
