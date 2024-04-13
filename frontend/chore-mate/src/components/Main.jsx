import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { checkAuth, load_user } from '../actions/auth'

const Main = (props) => {
    useEffect(() => {
        props.checkAuth()
        props.load_user()
    }, [])
    return (
        <div>
        <h1 className="text-3xl font-bold underline bg">hello</h1>
        {props.children}
        </div>
    )
}

export default connect(null, { checkAuth, load_user })(Main)