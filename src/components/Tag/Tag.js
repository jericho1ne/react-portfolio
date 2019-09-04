import React from 'react';

import './Tag.scss';

// same as filename but should be lowercase
const tag = ( props ) => {
  return (
    <span className="project-tag">
      { props.name }
    </span>
  )
}

export default tag
