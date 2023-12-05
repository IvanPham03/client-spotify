import axios from 'axios';

const path = 'http://localhost:8080/';

const instance = axios.create({
  baseURL: path,
  headers: {}
});

export default instance;
