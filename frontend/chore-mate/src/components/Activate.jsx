import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { useState, useEffect } from "react";
import { verify } from "../actions/auth";
import axios from 'axios'
import REACT_APP_API_URL from '../../globals'
import Navbar from "./Navbar";

const Activate = ({ verify, match }) => {
    
    const [verified, setVerified] = useState(false)
    const [csrfToken, setCsrfToken] = useState(null)
    const { uid, token } = useParams()


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

    const verify_account = e => {

        const headers = {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        };
        verify(uid, token)
        setVerified(true)
    }

    if (verified) {
        navigate('/')
        return null
    }

    return (
    <>
        <div className="container">
            <div className="flex flex-col justify-center items-center mt-52">
                <h1>Verify your account:</h1>
                <button onClick={verify_account} type="button" className="mt-12" >
                    Verify
                </button>
            </div>
        </div>
    </>

        
    )

    
}


export default connect(null, { verify })(Activate)