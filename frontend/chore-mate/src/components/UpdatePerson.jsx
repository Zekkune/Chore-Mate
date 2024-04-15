import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import REACT_APP_API_URL from '../../globals';

export default function UpdatePerson() {
    const { person_id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState({
        first_name: '',
        age: '',
        profile_img: '',
    });

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`${REACT_APP_API_URL}/people/${person_id}`);
                setPerson(response.data);
            } catch (error) {
                console.error('Error fetching person details:', error);
            }
        };

        fetchPerson();
    }, [person_id]);

    const handleChange = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${REACT_APP_API_URL}/api/update_person/${person_id}`, person);
            console.log('Person updated successfully');
            navigate('/choremate');
        } catch (error) {
            console.error('Error updating person:', error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-2/3">
                <h1 className="text-2xl font-bold mb-6">Update Person</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block font-semibold">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="first_name"
                            value={person.first_name}
                            onChange={handleChange}
                            className="w-full border rounded-md py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block font-semibold">Age:</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={person.age}
                            onChange={handleChange}
                            className="w-full border rounded-md py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="profileImg" className="block font-semibold">Profile Image:</label>
                        <input
                            type="text"
                            id="profileImg"
                            name="profile_img"
                            value={person.profile_img}
                            onChange={handleChange}
                            className="w-full border rounded-md py-2 px-3"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Update Person</button>
                </form>
                <Link to="/choremate" className="block text-center text-blue-500 mt-4 hover:underline">Return To Choremate</Link>
            </div>
        </div>
    );
}
