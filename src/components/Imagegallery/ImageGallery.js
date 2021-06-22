import React from 'react'
import ImageGalleryItem from './ImageGalleryItem'
import PropTypes from "prop-types"


const ImageGallery = ({pictures, onOpenModal}) => {
    return (
        <ul className="ImageGallery" id='imagesList'>
            <ImageGalleryItem pictures={pictures} onOpenModal={onOpenModal}/>
      </ul>

    );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object),
  onOpenModal: PropTypes.func.isRequired,
}

export default ImageGallery;