import React from 'react';
import './index.scss';

const Modal = ({ isOpen, className, onClose, imageSrc, videoSrc, component } : { isOpen: boolean, className?: string, onClose: any, imageSrc?: string, videoSrc?: string, component?: any }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={className} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">Cerrar</button>
        {imageSrc && <img src={imageSrc} alt="Expanded content" />}
        {videoSrc && (
          <video controls>
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        )}
        {component!! && component}
      </div>
    </div>
  );
};

export default Modal;
