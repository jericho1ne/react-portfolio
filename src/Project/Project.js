import React from 'react';
import ReactMarkdown from 'react-markdown';

import './Project.scss';

// same as filename but should be lowercase
const project = ( props ) => {
  return <div className="project-card">
      <div className="card-img-top">
        <img className="card-img-top"
          src={`${props.thumb}`}
          alt={ props.title }
        />
      </div>
      <div className="card-details">
        <h2>{ props.title }</h2>
        <hr />
        <div><ReactMarkdown source={ props.subtitle} /></div>
        <div>
          <button
            id={ props.id }
            onClick={ props.clickHandler }>DETAILS</button>
        </div>
      </div>
    </div>
}

export default project
