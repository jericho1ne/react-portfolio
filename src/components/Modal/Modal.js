// import React from 'react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
// import Tag from '../Tag/Tag'
import Multimedia from '../Multimedia/Multimedia'

import './Modal.scss'

const Modal = ( props ) => {
  return (
    <div
      className={`modal-wrapper ${(props.show ? 'modal-show' : 'modal-hide')}`}
      style={{ opacity: props.opacity }} >
      {/* Modal header */}
      <div className="modal-header" onClick={ props.closeHandler } >
        <h2 className="">{ props.title }</h2>
        <div>
          <button className="center"
          id={ props.id }
          onClick={ props.closeHandler }
         >Close</button>
        </div>
      </div>
      {/* Modal body */}
      <div className="modal-body">
        <div className="subtitle">
          <ReactMarkdown children={ props.subtitle} />
        </div>
        {/* Project Details */}
        <div className="description">
          <ReactMarkdown children={ props.detail } />
        </div>
        {/* Rich Media Component */}
        <Multimedia
          title={ props.title }
          media={ props.media }
        />
      </div>
    </div>
  )
}

export default Modal
