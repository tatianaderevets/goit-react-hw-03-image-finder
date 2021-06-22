import React from 'react';


const Modal = ({modalImg}) => {
    return (
        <div className="Overlay">
            <div className="Modal">
                <img src={modalImg} alt="" />
            </div>
        </div>
    );
};

export default Modal;
