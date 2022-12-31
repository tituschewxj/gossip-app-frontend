import axios from 'axios'

const axiosConfig = {
    baseURL: 'http://localhost:3000',
}

export default axios.create(axiosConfig);