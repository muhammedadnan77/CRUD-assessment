import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../Components/table.module.css"


const UserCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/companies', {
          headers: { 'x-auth-token': token }
        });
        setCompanies(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      {/* <h2>Your Companies</h2> */}
      <table className={styles.table}>
        <thead>
          <tr>
          <th>SNo.</th> {/* Add Serial Number Header */}
            <th>Company Name</th>
            <th>Company Address</th>
            <th> Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company,index) => (
            <tr key={company._id}>
                <td>{index+1}</td>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.approved ? 'Approved' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCompanies;
