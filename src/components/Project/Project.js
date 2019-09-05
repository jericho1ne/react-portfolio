import React from 'react';
import ReactMarkdown from 'react-markdown';

import './Project.scss';
import Tag from '../Tag/Tag'

// same as filename but should be lowercase
const Project = ( props ) => {
  // const setViewState = () => {
    // useState({
    //   viewState: 'some new value',
    //   projects: projectData,
    // })
  // }

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
    <div className={`project-card ${(props.inFocus ? 'project-focus' : '')}`}>
      <div className="card-img-top">
        <img className=""
          src={ props.thumb }
          alt={ props.title }
        />
      </div>
      <div className="card-details">
        <h2 className="card-title">{ props.title }</h2>
        <div className="card-tech">{ tagsList }</div>
        <div className="card-subtitle"><ReactMarkdown source={ props.subtitle} /></div>
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
