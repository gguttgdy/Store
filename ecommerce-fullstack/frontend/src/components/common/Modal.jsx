import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'modal-lg',
  showFooter = true,
  footerContent
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={`modal-dialog ${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            {children}
          </div>
          
          {showFooter && (
            <div className="modal-footer">
              {footerContent || (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onClose}
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
