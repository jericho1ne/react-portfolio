import React from 'react'

import './Header.scss'

// same as filename but should be lowercase
const Header = ( props ) => {
  // Build
  const linkButtons = props.links.map(function(link) {
    return (
      <a className="button"
        key={ link.id }
        href={ link.url }
        target="_blank"
        rel="noopener noreferrer"
      >{ link.title }</a>
    )
  })

  return (
    <header className="header">
      <h2 className="cover-heading">Hello.</h2>
      <p className="subtitle">
        I am a full stack developer, cyclist and coffee enthusiast. Founder of <a href="https://lowtidedigital.com/">Low Tide Digital</a> & <a href="http://envueplatform.com">Envue</a>.
      </p>
      <div className="header__links">
        { linkButtons }
      </div>
    </header>
  )
}

export default Header
