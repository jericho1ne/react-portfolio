import React from 'react';
import ReactMarkdown from 'react-markdown';

import './Project.scss';
import Tag from '../Tag/Tag'

// same as filename but should be lowercase
const Project = ( props ) => {
  // Get list of tech used in project, turn it into individual Tags
  const tags = props.tech.split(",").map(function(item) {
    return item.trim();
  });

  const tagsList = tags.map(function(tag, index) {
    return (
      <Tag
        key={ index }
        name={ tag }
      />
    );
  });

  return (
    <div className={`project-card ${(props.inFocus ? 'project-focus' : '')}`}
      style={{ opacity: props.opacity }} >
      <div className="card-img-top">
        <img className=""
          src={ props.thumb }
          alt={ props.title }
        />
      </div>
      <div className="card-title"><h2>{ props.title }</h2></div>
      <div className="card-details">
        <div className="card-tech">{ tagsList }</div>
        <div className="card-subtitle"><ReactMarkdown source={ props.subtitle} /></div>
        <div className={` ${(!props.inFocus ? 'd-none' : '')}`}><ReactMarkdown source={ props.detail } /></div>
        <div>
          <button
            id={ props.id }
            onClick={ props.clickHandler }>{ (!props.inFocus ? 'DETAILS' : 'CLOSE') }</button>
        </div>
      </div>
    </div>
  )
}

export default Project
