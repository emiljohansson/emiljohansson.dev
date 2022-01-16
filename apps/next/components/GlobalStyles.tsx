import { globalCss } from '@/stitches'
import { fonts } from '../src/styles/variables'

const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box"
  },
  html: {
    fontFamily: "sans-serif",
    lineHeight: 1.15,
    WebkitTextSizeAdjust: "100%",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
  },
  body: {
    margin: "0",
    fontFamily: fonts.baseFontFamily,
    fontSize: "1rem",
    fontWeight: 300,
    lineHeight: 1.5,
    color: "#212529",
    textAlign: "left",
    backgroundColor: "#fff"
  },
  "html,\nbody,\n#__next,\nmain": { height: "100%" },
  a: {
    backgroundColor: "transparent",
    color: "#282a36",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" }
  },
  "a,\nbutton,\ninput": {
    "&:focus": { outline: "-webkit-focus-ring-color auto 5px" }
  }
})

const GlobalStyles = () => {
  globalStyles()
  return (
    <></>
  )
}

export default GlobalStyles
