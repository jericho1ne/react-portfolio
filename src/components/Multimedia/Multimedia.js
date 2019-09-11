import React from 'react'
import './Multimedia.scss'

// same as filename but should be lowercase
const Multimedia = ( props ) => {
  const buildIframe = () => {
    return {
      __html: props.media.embed
    }
  }

  // Check which media type we need to display
  let media_chunk = ''

  // Iframe
  if ('embed' in props.media) {
    media_chunk = <div dangerouslySetInnerHTML={ buildIframe() } />
  }
  // External Project
  else if ('link' in props.media) {
    media_chunk = <a className="button" href={ props.media.link } target="_blank" rel="noopener noreferrer">View Project</a>
  }
  // Screenshots
  else if ('images' in props.media) {
    media_chunk = props.media.images.map(function(image, index) {
      return <img key={index} alt="" src={ require(`../../assets/projects/${image}`) } />
    })
  }

  return (
    <div className="multimedia-container">
      { media_chunk }
    </div>
  )
}

export default Multimedia
