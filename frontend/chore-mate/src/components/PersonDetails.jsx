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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 dark:bg-black">
        <div className="bg-slate-200 dark:bg-grey p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4 flex flex-row justify-evenly">
            <h2 className="text-xl font-semibold flex-1">{person.first_name}, {person.age}</h2>
            <img src={person.profile_img} alt={person.first_name} className="rounded-lg my-4 flex-1 bg-pink-50" />
           
        </div>
        <div className='flex justify-between'>
        <button className='bg-neonred hover:bg-darkneonred dark:bg-darkneonred dark:hover:bg-neonred text-white py-2 px-4 rounded-md shadow flex-1 mr-2' onClick={() => {deletePerson()}}>Delete {person.first_name}</button>
        <button onClick={() => navigate(`/api/update_person/${person_id}`)} className='bg-neonred hover:bg-darkneonred dark:bg-darkneonred dark:hover:bg-neonred text-white py-2 px-4 rounded-md shadow flex-1'>Update {person.first_name}</button>
        </div>
        <Link to='/choremate/' className='bg-neonred hover:bg-darkneonred dark:bg-darkneonred dark:hover:bg-neonred text-white py-2 px-4 rounded-md shadow block mt-2'>Return To Choremate</Link>
        </div>
        </div>
    )
}