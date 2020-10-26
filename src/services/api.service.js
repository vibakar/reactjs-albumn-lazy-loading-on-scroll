import axios from 'axios';

const endPoint = 'https://jsonplaceholder.typicode.com';

class ApiService {
   
    static getAlbumnList() {
        return axios.get(`${endPoint}/albums`)
        .then(res => res)
        .catch(err => []);
    }

    static getAlbum(id) {
        return axios.get(`${endPoint}/photos?albumId=${id}`)
        .then(res => res)
        .catch(err => []);
    }
}

export default ApiService;