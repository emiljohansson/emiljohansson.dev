export const colors = {
  white:    '#fff',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  black:    '#000',

  blue:    '#007bff',
  indigo:  '#6610f2',
  purple:  '#6f42c1',
  pink:    '#e83e8c',
  red:     '#dc3545',
  orange:  '#fd7e14',
  yellow:  '#ffc107',
  green:   '#28a745',
  teal:    '#20c997',
  cyan:    '#17a2b8',

  primary: '#282a36',
  // 'secondary':     $gray600,
  // 'success':       $green,
  // 'info':          $cyan,
  // 'warning':       $yellow,
  // 'danger':        $red,
  // 'light':         $gray100,
  // 'dark':          $gray800,
}

// fonts
export const fonts ={
  'font-family-sans-serif': `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
}

// base
// $body-bg:          $white,
// $body-color:       $gray900,
// $font-weight-base: 300,

// @import "../vendor/bootstrap/functions",
// @import "../vendor/bootstrap/variables",
// @import "../vendor/bootstrap/mixins",
// @import "./functions",

const spacer = 1
export const spacers = [
  0,
  (spacer * .25),
  (spacer * .5),
  spacer,
  (spacer * 1.5),
  (spacer * 3)
].map(value => `${value}rem`)

console.log(spacers)
