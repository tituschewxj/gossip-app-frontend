import axios from 'axios'

// adds the jwt token to the headers
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
}

const axiosConfig = {
    baseURL: 'http://localhost:3000',
}

export default axios.create(axiosConfig)