import React from 'react'
import ReactMarkdown from 'react-markdown'

import './Header.scss'

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

  // Create JSX fragment of wecome message
  const welcomeDiv = <React.Fragment>
      <ReactMarkdown className="cover-heading" source={ props.title} />
      <ReactMarkdown className="subtitle" source={ props.body} />
    </React.Fragment>

  return (
    <header className="header">
      { props.isVisible
        ? welcomeDiv
        : '' }
      <div className="header__links">
        { linkButtons }
      </div>
    </header>
  )
}

export default Header
