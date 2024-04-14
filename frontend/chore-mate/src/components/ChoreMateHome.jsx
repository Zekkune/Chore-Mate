import { useEffect, useState } from "react"
import axios from "axios"
import REACT_APP_API_URL from '../../globals'
import { Link, Navigate, useNavigate } from "react-router-dom";

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
    <div className="h-screen grid grid-cols-6 grid-rows-8 gap-x-0 gap-y-0">
      <div className="bg-red-200 col-span-6 row-span-1 flex">Div 1</div>
      <div className="bg-blue-200 col-span-1 row-span-6 col-start-1 row-start-2" >Div 2</div>
      <div className="bg-green-200 col-span-6 row-span-1 col-start-2">Div 3</div>
      <div className="bg-yellow-200 col-span-6 row-span-6 col-start-2 row-start-3">
        {people.map(person => (
        <div key={person.person_id} className="bg-red-400 mt-2 hover:bg-red-800" onClick={() => navigate(`/people/${person.person_id}`)}>
          <p>{person.first_name}</p>
        </div>
      ))}
      </div>
      <div className="bg-purple-200 col-span-6 row-span-1 col-start-1 row-start-8">Div 5</div>
    </div>
    </>

        
    )
}