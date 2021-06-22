import React from 'react';
import { Component } from 'react';


class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', (e) => {
            
            if (e.key === 'Escape') {
                this.props.onCloseModal(e)
            }
        });
    }
    render()
    {return (
        <div onClick={this.props.onCloseModal} className="Overlay">
            <div className="Modal">
                <img src={this.props.modalImg} alt="" />
            </div>
        </div>
    )
    };
};

export default Modal;
