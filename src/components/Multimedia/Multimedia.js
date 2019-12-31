import React from 'react'
import './Multimedia.scss'

import Slider from '../Slider/Slider'

const Multimedia = ( props ) => {
  const buildIframe = () => {
    return {
      __html: props.media.embed
    }
  }

  // Check which media type we need to display
  let media_chunk = ''
  let hasLink = false

  if (props.media !== undefined) {
    // Iframe
    if ('embed' in props.media) {
      media_chunk = <div dangerouslySetInnerHTML={ buildIframe() } />
    }
    // Screenshots
    else if ('images' in props.media) {
      media_chunk = <Slider images={ props.media.images } />
    }

    // If an external link is present, we will wrap the entire container
    if ('link' in props.media) {
      hasLink = true
      media_chunk =
        <a href={`${props.media.link}`} target="_blank" rel="noopener noreferrer"
          className="external__link"
          alt={`View ${props.title} in a new window`}
        >{media_chunk}</a>
    }
  }

  return (
    <div className={`multimedia-container ${ hasLink ? 'external__link' : '' }`}>
      { media_chunk }
    </div>
  )
}

export default Multimedia
