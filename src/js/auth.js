import axios from 'axios'
import {isAuthenticated} from '../redux/actions'
import store from '../redux/store'

/**
 * Set isAuthenticated state of store
 * @param {boolean} state 
 */
const setAuthState = state => {
    store.dispatch(isAuthenticated(state))
}

/**
 * Login user
 * @param {string} name 
 * @param {string} pass
 * @returns {string|boolean} false if failed
 */
export const login = (name, pass) => {
    axios({
        method: 'post',
        url: '/api/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            name,
            pass
        }
    })
        .then(res => {
            window.localStorage.setItem('token', res.data.token)
            setAuthState(true)
            return res.data.token
        })
        .catch(() => {
            setAuthState(false)
            return false
        })
}

export const logout = () => {
    window.localStorage.removeItem('token'),
    setAuthState(false)
}

export const verifyToken = () => {
    axios({
        method: 'post',
        url: '/api/auth/check',
        headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token')}
    })
        .then(() => {
            setAuthState(true)
            return true
        })
        .catch(() => {
            window.localStorage.removeItem('token')
            setAuthState(false)
            return false
        })
}

/**
 * Api call wrapper for protected enpoints
 * @param {string} method get|post|put|delete
 * @param {string} url api endpoint without '/api' ei: '/notes' => '/api/notes'
 */
export const apiProtected = (method, url, data) => {
    axios({
        method,
        url: '/api' + url,
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    })
        .then(res => {
            return res.data
        })
        .catch(err => {
            if (err.data.error === 'Invalid Token') {
                window.localStorage.removeItem('token')
                setAuthState(false)
                return false
            } else {
                return false
            }
        })
}