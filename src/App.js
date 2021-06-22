import './App.css';
import Searchbar from './components/Searchbar'
import React, { Component } from 'react';
import imageApi from './cervices/imageApi';
import Modal from './components/Modal';


// const API_KEY = '21313596-53d18e4a7f22f2d08b7d5fbe5';
// const BASE_URL = 'https://pixabay.com/api/';
// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12


class App extends Component {
  
  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalImg: '',
  };

  onOpenModal = (e) => {
    this.setState({modalImg: e.target.dataset.source, showModal: true})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPictures()
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, pictures: [], error: null, });
    // console.log(query);

   
    
  };

  fetchPictures = () => {
    const { currentPage, searchQuery } = this.state;
    
    const options = {
      searchQuery,
      currentPage,
    }

    this.setState({ isLoading: true });

    imageApi.fetchPictures(options)
      .then(hits => {
        
        // console.log(response.data.hits)
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      }).catch(error => this.setState({ error }))
      .finally(() => {this.setState({ isLoading: false })
      window.scrollTo({
        top: document.querySelector('#imagesList').scrollHeight,
        behavior: 'smooth',
      });
  });
    

    
  }





  render() {
    const { pictures, isLoading, error } = this.state;
    const shoultdRenderLoadMoreButton = pictures.length > 0 && !isLoading;

    return (
    <>
        <div className="App">
          {error && <h1>Error!!!</h1>}
          <Searchbar onSubmit={this.onChangeQuery} />
         
      <ul className="ImageGallery" id='imagesList'>
        {pictures.map(({ id, webformatURL, user, largeImageURL,onOpenModal }) =>
          <li key={id} onClick = {onOpenModal} className="ImageGalleryItem" >
            <img src={webformatURL}
              alt={user}
              data-source={largeImageURL}
              onOpenModal={onOpenModal}
              className="ImageGalleryItem-image" />
          </li>)}
      </ul>
       {isLoading && <h1>Загружаем...</h1>}

          {shoultdRenderLoadMoreButton && (<button className="Button" onClick={this.fetchPictures} type="button">
            Load more
          </button>
          )}
          {/* {this.state.showModal && <Modal  modalImg= {this.state.modalImg} />} */}
        </div>
    </>
  );
}
  
}

export default App;
