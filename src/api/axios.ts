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
        if (decoded.exp < dateNow.getTime()) {
            console.log('not expired')
            return false
        } else {
            console.log('expired')
            return true
        }
    }
    console.log('no jwt')
    return true
}

const axiosConfig = {
    baseURL: 'http://localhost:3000',
}

export default axios.create(axiosConfig)
