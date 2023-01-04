import { updateJWTToken } from '../api/authenticationApi'

export default function useLoginState() {
    // if logged in, token exists
    updateJWTToken()
    return localStorage.getItem('token')
}
