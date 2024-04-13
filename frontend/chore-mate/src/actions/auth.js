import axios from 'axios'
import REACT_APP_API_URL from '../../globals'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
} from './types'

export const checkAuth = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access') })
        
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/auth/users/me/`, config)
    
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            })
        } catch (error){
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
    } else {
        dispatch({
            type: LOAD_USER_FAIL
        })
    }
}

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })

    try {
        const res = await axios.post(`${REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(load_user())
    } catch (error){
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}