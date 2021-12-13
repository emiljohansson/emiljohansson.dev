import React from 'react'
import { globalCss } from '@/stitches'
import { fonts } from '../src/styles/variables'

const globalStyles = globalCss({
  body: {
    fontFamily: fonts.baseFontFamily
  }
})

const GlobalStyles = () => {
  globalStyles()
  return (
    <></>
  )
}

export default GlobalStyles
