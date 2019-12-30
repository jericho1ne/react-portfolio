import React from 'react'

import './Footer.scss'
import gh_logo from "../../assets/gh-logo.svg"
import introduction from '../../assets/introduction.json'

const Footer = ( props ) => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div>
          <a href={ introduction.footer.ghlink }
            target="_blank"
            rel="noopener noreferrer"
          ><button><img className="icon"
            src={ gh_logo }
            alt={ introduction.footer.alt }
          /></button></a>
        </div>
        <div className="">
          <p>{ introduction.footer.title }</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
