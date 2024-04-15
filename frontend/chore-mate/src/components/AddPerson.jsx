import React, { useState } from 'react';
import axios from 'axios';
import REACT_APP_API_URL from '../../globals'
import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

const AddPerson = () => {
    const [formData, setFormData] = useState({
        is_parent: '',
        profile_img: '',
        first_name: '',
        last_name: '',
        age: '',
        
    });

    // const [csrfToken, setCsrfToken] = useState(null)

    const getToken = async () => {
        try {
            let response = await axios.get(`${REACT_APP_API_URL}/api/create_person/`)
            return response.data.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    }
    // useEffect(() => {
    //     getToken()
    //     console.log(csrfToken)
    // }, []);
    // is_parent = models.BooleanField(default=False)
    // profile_img = models.TextField(blank=True)
    // first_name = models.CharField(max_length=100, blank=False, null=False)
    // last_name = models.CharField(max_length=100, blank=False, null=False)
    // age = models.PositiveIntegerField()

    const { is_parent, profile_img, first_name, last_name, age } = formData

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    };

    const addPerson = async e => {
        try {
            // const csrfToken = await getToken();
            
            await axios.post(`${REACT_APP_API_URL}/api/create_person/`, formData, 
        );
            console.log('Data added successfully');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

   

    const handleSubmit = async e => {
        e.preventDefault();
        addPerson()
        
    };

    return (
        <div className='w-8/12 bg-slate-400 p-6 flex flex-col justify-center items-center mx-auto'>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-100 p-6 rounded-md mt-12 w-8/12">
        <div className="flex flex-col space-y-4">
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="is_parent"
        value={true}
        onChange={handleChange}
        className="rounded"
      />
      <span>Parent User?</span>
    </label>
    <input
      type="file"
      accept='image/*'
      name="profile_img"
      value={profile_img}
      onChange={handleChange}
      placeholder="Profile Image URL"
      className="border rounded-md p-2"
    />
    <input
      type="text"
      name="first_name"
      value={first_name}
      onChange={handleChange}
      placeholder="First Name"
      className="border rounded-md p-2"
    />
    <input
      type="text"
      name="last_name"
      value={last_name}
      onChange={handleChange}
      placeholder="Last Name"
      className="border rounded-md p-2"
    />
    <input
      type="text"
      name="age"
      value={age}
      onChange={handleChange}
      placeholder="Age"
      className="border rounded-md p-2"
    />
    <button
      type="submit"
      className="bg-blue-400 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500"
    >
      Submit
    </button>
  </div>
</form>
<Link to='/choremate/' className='bg-blue-400 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500 mt-6'>Return To Choremate</Link>
</div>
    );
};

export default AddPerson;
