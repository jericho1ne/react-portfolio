// import React from 'react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Tag from '../Tag/Tag'
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
          <ReactMarkdown source={ props.subtitle} />
        </div>
        <div className="description">
          <ReactMarkdown source={ props.detail } />
        </div>
        <Multimedia media={ props.media } />
      </div>
    </div>
  )
}

export default Modal
