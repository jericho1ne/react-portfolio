import React from 'react'

import './Tag.scss'

const Tag = ( props ) => {
  return (
    <span className="project-tag">
      { props.name }
    </span>
  )
}

export default Tag
