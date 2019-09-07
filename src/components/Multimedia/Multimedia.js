import React from 'react';

import './Multimedia.scss';

// same as filename but should be lowercase
const Multimedia = ( props ) => {

  const buildIframe = () => {
    return {
      __html: props.media.embed
    }
  }


  // let media_chunk = '';
  // Check which media type we need to display
  if ('embed' in props.media) {
    console.log(props.media.embed)
    // media_chunk = props.media.embed;
  }
  return (
    <div className="multimedia-container">
      <div dangerouslySetInnerHTML={ buildIframe() } />
    </div>
  )
}

export default Multimedia
