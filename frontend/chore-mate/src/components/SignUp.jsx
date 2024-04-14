import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { useState, useEffect } from "react";
import { login, signup } from "../actions/auth";
import axios from 'axios'
import REACT_APP_API_URL from '../../globals'
import Navbar from "./Navbar";

const SignUp = ({ signup, isAuthenticated }) => {

    
    
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        re_password: '',
    })

    const [csrfToken, setCsrfToken] = useState(null)

    const { email, username, password, re_password } = formData

    const navigate = useNavigate()

    const getToken = async () => {
        let response = await axios.get(`${REACT_APP_API_URL}/api/csrf/`)
        console.log(response)
        setCsrfToken(response.data.csrfToken)
    }
    useEffect(() => {
        getToken()
        console.log(csrfToken)
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        const headers = {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        };

        if (password === re_password) {
            signup(email, username, password, re_password, headers)
            setAccountCreated(true)
        }
        
    }

    if (isAuthenticated) {
        navigate('/')
        return null
    }

    if (accountCreated) {
        return navigate ('/login')
    }

    return (
        <>
        <Navbar className='mt-0 mb-6'></Navbar>
        <div className="mt-5 bg-gray-100 rounded-lg shadow-md p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-500">Sign Up</h1>
        <p className="text-gray-600 mb-6">Create your account</p>
        <form onSubmit={e => onSubmit(e)} className="max-w-xs mx-auto">
        <div className="mb-4">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
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
          <div className="mb-4">
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
            <div className="mb-6">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Confirm Password"
              name="re_password"
              value={re_password}
              onChange={e => onChange(e)}
              minLength={8}
              required
            />
          </div>
          
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <p className="mt-4">Already have an account? <Link className='text-blue-700 hover:text-blue-400' to = '/login'>Log in</Link></p>
        </form>
      </div>
      </>

        
    )

    
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(SignUp)