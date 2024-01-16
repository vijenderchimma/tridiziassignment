import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Header from '../Header';
import './index.css'; // Make sure to create this CSS file

const Home = () => {
    const [employeeData, setEmployeeData] = useState([]);
  
   
  
    const onClickDelete = async (employeeIdToDelete) => {
      console.log('Deleting employee with ID:', employeeIdToDelete);
  
      try {
        if (!employeeIdToDelete) {
          console.error('Employee ID is undefined or null');
          console.log('employeeData:', employeeData);
          return;
        }
  
        const response = await fetch(`http://localhost:3001/employeedetails/${employeeIdToDelete}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Employee deleted successfully.');
          setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== employeeIdToDelete));
        } else {
          console.error('Error deleting employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting employee:', error.message);
      }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3001/employeedetails');
    
            if (response.ok) {
              const data = await response.json();
              setEmployeeData(data);
            } else {
              console.error('Error fetching data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, [employeeData]);


    console.log(employeeData)

  return (
    <div className="home-container">
        <Header/>
      <h1 className="main-heading">Employee Details</h1>
      <div className="details-container">
        <div>
        {employeeData.map((eachdata) => (
            <table>
              <thead>
              <tr>
                  <th>id</th>
                  <th>FullName</th>
                  <th>Age</th>
                  <th>Experience</th>
                  <th>Skills</th>
                  <th>salary</th>
                  <th>DateOfJoining</th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody>
              
                <tr  key={eachdata._id}>
                <td>{eachdata._id}</td>
                <td>{eachdata.fullName}</td>
                <td>{eachdata.age}</td>
                <td>{eachdata.experience}</td>
                <td>{eachdata.skills}</td>
                <td>{eachdata.salary}</td>
                <td>{eachdata.dateOfJoining}</td>
                <td>
                  <img src={eachdata.photo} alt={eachdata.fullName} />
                </td>
                  <td>
                        <button onClick={() => onClickDelete(eachdata._id)} className="delete-button">
                        <MdDeleteOutline className="icon" />
                        </button>
                  </td>
                </tr>
                
              </tbody>
            </table>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
