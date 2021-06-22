import React from 'react';
import { Component } from 'react';
import PropTypes from "prop-types"


class Modal extends Component {

     static propTypes = {
    onCloseModal: PropTypes.func,
  }

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
