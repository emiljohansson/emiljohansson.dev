import GlobalStyles from '../components/GlobalStyles'
// import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
}
