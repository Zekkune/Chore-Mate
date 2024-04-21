import { useEffect, useState } from "react"
import axios from "axios"
import REACT_APP_API_URL from '../../globals'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from '../actions/auth'

export default function ChoreMateHome () {

    let navigate = useNavigate()
    const [people, setPeople] = useState([])

    const getPeople = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/people/`)
            console.log(response.data)
            setPeople(response.data)
            return people
            
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    }

    const deletePerson = async () => {
        try {
            let response = await axios.delete(`${REACT_APP_API_URL}/people/${person.person_id}`)
        } catch (error) {
            console.error('Couldnt Delete Person', error);
            return null;
        }
    }


    useEffect(() => {
        getPeople()
        console.log(people)
    }, [])

    return (
        // <div className="h-screen w-screen bg-slate-300 dark:bg-slate-900 z-0 f">
        <>
    <div className="h-screen grid grid-cols-6 grid-rows-8 gap-x-0 gap-y-0 bg-white dark:bg-midgrey">
      <div className="bg-babygrey dark:bg-grey col-span-6 row-span-1 flex mb-2">
        <h1 className="text-black dark:text-slate-300 text-2xl">Chore-Mate</h1>
      </div>

      <div className="bg-white dark:bg-midgrey border-grey border-opacity-40 border-r-2 col-span-1 row-span-6 col-start-1 row-start-2 flex flex-col items-center">
      <Link to = '/api/create_person/' className="h-auto bg-neonred hover:bg-darkneonred dark:bg-darkneonred dark:hover:bg-neonred text-white py-2 px-4 rounded-md shadow mt-6 w-10/12 text-xs text-center">Add a new person</Link>
      </div>

      <div className="bg-white dark:bg-midgrey col-span-6 row-span-1 col-start-2 text-center border-b-2 border-grey border-opacity-40 mx-4">
        <h1 className="text-4xl mt-2">Ready to start your day?</h1>
      </div>
      <div className="bg-triangle col-span-6 row-span-6 col-start-2 row-start-3 bg-no-repeat bg-cover bg-center">
        {people.map(person => (
        <div key={person.person_id} className="bg-red-400 mt-2 hover:bg-red-800" onClick={() => navigate(`/people/${person.person_id}`)}>
          <p>{person.first_name}</p>
        </div>
      ))}
      </div>
      <div className="bg-babygrey dark:bg-grey col-span-6 row-span-1 col-start-1 row-start-8">
      <Link to={'/'} className="text-slate-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={logout}>
              Logout
            </Link>
      </div>
    </div>
    
    </>

        
    )
}