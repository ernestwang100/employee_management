import axios from 'axios';
//build instances
let request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000
});
//request
request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//respond
request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default request;