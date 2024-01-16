import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid'

import './index.css'
import Header from '../Header';

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    fullName: '',
    age: '',
    experience: '',
    skills: '',
    dateOfJoining: '',
    salary: '',
    photo: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value,id: uuidv4()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { ...employeeData};

    try {
      const response = await fetch('http://localhost:3001/employeedetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        console.log('Data successfully sent to the server.');
      } else {
        console.error('Error sending data to the server:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to the server:', error.message);
    }

    // Reset the form data
    setEmployeeData({
      fullName: '',
      age: '',
      experience: '',
      skills: '',
      dateOfJoining: '',
      salary: '',
      photo: '',
    });
  };



  return (
    <>
    <Header />
    <div className='employee-container'>
      
    <form onSubmit={handleSubmit} className='form-container'>
      <label className='label'>
        Full Name:
        <input type="text" name="fullName" className='user-input' value={employeeData.fullName} onChange={handleChange} />
      </label>

      <label className='label'>
        Age:
        <input type="number" name="age" className='user-input' value={employeeData.age} onChange={handleChange} />
      </label>

      <label className='label'>
        Experience:
        <input type="number" name="experience" className='user-input' value={employeeData.experience} onChange={handleChange} />
      </label>

      <label className='label'>
        Skills:
        <input type="text" name="skills" className='user-input' value={employeeData.skills} onChange={handleChange} />
      </label>

      <label className='label'>
        Date of Joining:
        <input type="date" name="dateOfJoining" className='user-input' value={employeeData.dateOfJoining} onChange={handleChange} />
      </label>

      <label className='label'>
        Salary:
        <input type="number" name="salary" className='user-input' value={employeeData.salary} onChange={handleChange} />
      </label>

      <label className='label'>
        Photo URL:
        <input type="text" name="photo" className='user-input' value={employeeData.photo} onChange={handleChange} />
      </label>

      <button type="submit" className='submit-button'>Submit</button>
    </form>
    </div>
    </>
  );
};

export default EmployeeForm;
