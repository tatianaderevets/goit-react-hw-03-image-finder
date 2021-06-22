import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/"

const fetchPictures = ({searchQuery = '', currentPage = 1, per_page = 12}) => {
    return axios
        .get(`?key=21313596-53d18e4a7f22f2d08b7d5fbe5&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${per_page}&page=${currentPage}`)
        .then(response => response.data.hits);
};

export default { fetchPictures };