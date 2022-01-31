import React from 'react'
import ReactMarkdown from 'react-markdown'
import Tag from '../Tag/Tag'

import './Project.scss'

const Project = ( props ) => {
  // Get list of tech used in project, turn it into individual Tags
  const tags = props.tech.split(",").map(function(item) {
    return item.trim()
  })

  // Built list of Tag components to be displayed
  const tagsList = tags.map(function(tag, index) {
    return (
      <Tag
        key={ index }
        name={ tag }
      />
    )
  })

  return (
    <div className={`project-card ${props.inFocus ? 'project-focus' : ''}`}
      style={{ opacity: props.opacity }} >

      <div className="card-img-top" onClick={ props.openHandler }>
        <img className=""
          src={ props.thumb }
          alt={ props.title }
        />
      </div>


      <h3 className="card-title">{ props.title }</h3>

      <div className="card-details">
        <div className="tech">{ tagsList }</div>
        <div className="card-subtitle"><ReactMarkdown children={ props.subtitle} /></div>
        <div className="float-bottom">
          <button onClick={ props.openHandler }>Details</button>
        </div>
      </div>

    </div>
  )
}

export default Project
