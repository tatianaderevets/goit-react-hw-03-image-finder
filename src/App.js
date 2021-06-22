import './App.css';
import React, { Component } from 'react';
import imageApi from './cervices/imageApi';
import Searchbar from './components/Searchbar'
import ImageGallery from './components/Imagegallery'

import Modal from './components/Modal';
import Loader from "react-loader-spinner";



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

  onCloseModal = (e) => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({showModal: false, modalImg: ''})
    }
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
          <ImageGallery pictures={pictures} onOpenModal={this.onOpenModal}/>
      
          {isLoading && <div style = {{position: 'fixed', top: '50%', left: "50%", transform: "translate(-50%, -50%)"}}>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} timeout={3000} />
          </div>}
          

          {shoultdRenderLoadMoreButton && (<button className="Button" onClick={this.fetchPictures} type="button">
            Load more
          </button>
          )}
          {this.state.showModal && <Modal modalImg={this.state.modalImg} onCloseModal={this.onCloseModal}/>}
        </div>
    </>
  );
}
  
}

export default App;
