import React from 'react'

import './Footer.scss'
import gh_logo from "../../assets/gh-logo.svg"
import websiteData from '../../assets/websiteData.json'

const Footer = ( props ) => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div>
          <a href={ websiteData.footer.ghlink }
            target="_blank"
            rel="noopener noreferrer"
          ><img className="icon"
            src={ gh_logo }
            alt={ websiteData.footer.alt }
          /></a>
        </div>
        <div>
          <a href={ websiteData.footer.ghlink }
            target="_blank"
            rel="noopener noreferrer"
          >{ websiteData.footer.title }</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
