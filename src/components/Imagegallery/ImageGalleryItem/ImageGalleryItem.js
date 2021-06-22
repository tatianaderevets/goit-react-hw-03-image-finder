import React from 'react'

const ImageGalleryItem = ({pictures, onOpenModal}) => {
    return (
pictures.map(({ id, webformatURL, user, largeImageURL }) =>
          <li key={id} onClick = {onOpenModal} className="ImageGalleryItem" >
            <img src={webformatURL}
              alt={user}
              data-source={largeImageURL}
              onOpenModal={onOpenModal}
              className="ImageGalleryItem-image" />
          </li>)
    )

}

export default ImageGalleryItem;