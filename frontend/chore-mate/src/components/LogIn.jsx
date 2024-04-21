import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { useState, useEffect } from "react";
import { login } from "../actions/auth";
import axios from 'axios'
import SignUp from "./SignUp";
import REACT_APP_API_URL from '../../globals'
import Navbar from "./Navbar";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [csrfToken, setCsrfToken] = useState(null)

    const { username, password } = formData

    const navigate = useNavigate()

    const getToken = async () => {
        let response = await axios.get(`${REACT_APP_API_URL}/api/csrf/`)
        setCsrfToken(response.data.csrfToken)
    }
    useEffect(() => {
        getToken()
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        const headers = {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        };
        login(username, password, headers)
    }

    if (isAuthenticated) {
        navigate('/choremate')
        return null
    }

    return (
        <>
        <Navbar className='mt-0 mb-6'></Navbar>
        <div className="mt-5 bg-gray-100 rounded-lg shadow-md p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-500">Sign In!</h1>
        <p className="text-gray-600 mb-6">Chore-Mate requires users to be signed in.</p>
        <form onSubmit={e => onSubmit(e)} className="max-w-xs mx-auto">
          <div className="mb-4">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength={8}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <p className="mt-4">Dont have an account? <Link className='text-blue-700 hover:text-blue-400' to = '/signup'>Sign Up</Link></p>
        </form>
      </div>
      </>

        
    )

    
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)