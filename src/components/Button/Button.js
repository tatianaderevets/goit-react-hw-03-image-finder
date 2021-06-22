import React from 'react';
import PropTypes from "prop-types"


const Button = ({ onClick, text }) => {
    return (
        <button className="Button" onClick={onClick} type="button">
            {text}
        </button>
          
    );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default Button;