import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link, Navigate, useNavigate } from "react-router-dom";
import REACT_APP_API_URL from '../../globals'



export default function PersonDetails () {
    const {person_id} = useParams()
    const [person, setPerson] = useState(null)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                let response = await axios.get(`http://localhost:8000/people/${person_id}`)
                setPerson(response.data)
            } catch (error) {
                console.error('Error fetching venue details:', error)
            }
        }

        fetchPerson()
    }, [])

    const getToken = async () => {
        try {
            let response = await axios.get(`${REACT_APP_API_URL}/api/csrf/`)
            setToken(response.data.csrfToken)
            console.log(response.data)
            return response.data.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    }

    const deletePerson = async () => {
        try {
            getToken()
            await axios.delete(`${REACT_APP_API_URL}/api/delete_person/${person_id}`,  {
                headers: {
                    'X-CSRFToken': token,
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Include cookies
            })
            console.log('Person deleted successfully');
            navigate('/choremate')
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (!person) return <h1>Loading...</h1>
    return (
        <div>
            <div>
            <h2>{person.first_name}</h2>
            <h3>age: {person.age}</h3>
            <h4>{person.profile_img}</h4>
            </div>
            <button className='h-10 bg-blue-500 p-6 hover:bg-blue-800' onClick={() => {deletePerson()}}>delete</button>
            <Link to='/choremate/' className='bg-blue-400 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500 mt-6'>Return To Choremate</Link>
            <button onClick={() => navigate(`/api/update_person/${person_id}`)} className='bg-blue-400 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500 mt-6'>Upate This Person</button>
        </div>
    )
}