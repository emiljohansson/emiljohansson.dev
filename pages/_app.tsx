import GlobalStyles from '../components/GlobalStyles'

export default function App({ Component, pageProps }) {
  return <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
}
