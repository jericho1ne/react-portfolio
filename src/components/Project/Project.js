import React from 'react'
import ReactMarkdown from 'react-markdown'
import Tag from '../Tag/Tag'
import Multimedia from '../Multimedia/Multimedia'

import './Project.scss'

// same as filename but should be lowercase
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
    <div className={`project-card ${(props.inFocus ? 'project-focus' : '')}`}
      style={{ opacity: props.opacity }} >

      <div className="card-img-top" onClick={ props.clickHandler }>
        { props.inFocus
            ? <button className="float-right" id={ props.id } onClick={ props.clickHandler }>Close</button>
            : '' }
        <img className=""
          src={ props.thumb }
          alt={ props.title }
        />
      </div>

      { !props.inFocus
          ? <h3 className="card-title">{ props.title }</h3>
          : '' }

      <div className="card-details">
      { !props.inFocus ? <div className="tech">{ tagsList }</div> : '' }
      { !props.inFocus
          ? <div className="card-subtitle"><ReactMarkdown source={ props.subtitle} /></div>
          : '' }
        <div className={`description ${(!props.inFocus ? 'd-none' : '')}`}><ReactMarkdown source={ props.detail } /></div>
        { !props.inFocus
          ? <div className="float-bottom"><button onClick={ props.clickHandler }>Details</button></div>
          : <Multimedia media={ props.media } /> }
      </div>

    </div>
  )
}

export default Project
