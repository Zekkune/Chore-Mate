import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux'
import { useState } from "react";
import SignUp from "./SignUp";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
    }

    return (
        <div className="mt-5">
            <h1>Sign In!</h1>
            <p>Sign in here...</p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <input className=""
                           type='text'
                           placeholder="username"
                           name="username"
                           value={username}
                           onChange={e => onChange(e)}
                           required />
                </div>
                <div>
                    <input className=""
                           type='password'
                           placeholder="password"
                           name="password"
                           value={password}
                           onChange={e => onChange(e)}
                           minLength={8}
                           required />
                </div>
                <button className="" type="submit">Login</button>
                <p>Dont have an account? <Link to={'/signup'}>Sign Up</Link></p>
                {/* <p>Forgot your password? <Link to={<ResetPassword/>}>Reset Password</Link></p> */}
            </form>
        </div>
        
    )

    // const mapStateToProps = state => ({
    //     //is authed
    // })
}

export default connect(null, {})(Login)