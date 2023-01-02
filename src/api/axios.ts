import axios from 'axios'
import jwtDecode from 'jwt-decode'

type JWTToken = {
    exp: number
}

export const hasJWTExpired = (): boolean => {
    const token = localStorage.getItem('token')
    if (token) {
        const decoded = jwtDecode<JWTToken>(token)
        const dateNow = new Date()
        return decoded.exp > dateNow.getTime()
    }
    return true
}

const axiosConfig = {
    baseURL: 'http://localhost:3000',
}

export default axios.create(axiosConfig)
