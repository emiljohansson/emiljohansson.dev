import * as React from 'react'
import { Link } from 'gatsby'
import './Landing.scss'

const name: string = 'Landing'

const Landing = () => (
  <>
    <div className={`${name}__github`}>
      <a
        href="https://github.com/emiljohansson"
        target="_blank"
        className={`${name}__link`}
      >
        <i className="fab fa-github" /> emiljohansson
      </a>
    </div>
    <ul className={`${name}__apps`}>
      <li>
        <Link
          to="/random-string/"
          className="link"
        >Random String</Link>
      </li>
      <li>
        <Link
          to="/current-time/"
          className="link"
        >Current Time</Link>
      </li>
      <li>
        <Link
          to="/two-way-auth-generate/"
          className="link"
        >Two-Factor Authentication - Generate Code</Link>
      </li>
      <li>
        <Link
          to="/two-way-auth-enter/"
          className="link"
        >Two-Factor Authentication - Enter Code</Link>
      </li>
      <li>
        <Link
          to="/progress-bar/"
          className="link"
        >Progress Bar</Link>
      </li>
      {/* <li>
        <Link
          to="/chat/"
          className="link"
        >Chat</Link>
      </li> */}
    </ul>
  </>
)

export default Landing
