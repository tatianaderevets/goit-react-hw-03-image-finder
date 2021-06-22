import React from 'react'
import ImageGalleryItem from './ImageGalleryItem'


const ImageGallery = ({pictures, onOpenModal}) => {
    return (
        <ul className="ImageGallery" id='imagesList'>
            <ImageGalleryItem pictures={pictures} onOpenModal={onOpenModal}/>
      </ul>

    );
};

export default ImageGallery;