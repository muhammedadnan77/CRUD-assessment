import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from './EditModal';
import AddCompanyForm from './AddCompanyForm';
import styles from "../Components/table.module.css"
import { Link } from 'react-router-dom';


const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [editCompany, setEditCompany] = useState(null); // Track the company being edited
  const [search, setSearch] = useState({ name: '', createdBy: '' });  // Search fields state


  // Fetch companies when the component loads
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/companies', {
          headers: { 'x-auth-token': token }
        });
        setCompanies(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchCompanies();
  }, []);



  // Handle search form inputs
  const handleSearchInput = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // Search companies by name or createdBy (login ID)

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/companies/search', {
        headers: { 'x-auth-token': token },
        params: {
          name: search.name,
          createdBy: search.createdBy
        }
      });
      setCompanies(res.data);  // Update companies list with the search results
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // Function to delete a company
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/companies/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setCompanies(companies.filter(company => company._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };


  // Function to open the edit modal
  const openEditModal = (company) => {
    setEditCompany(company);  // Set the company being edited
  };

  // Function to update the company list after editing
  const handleUpdate = (updatedCompany) => {
    setCompanies(companies.map(company =>
      company._id === updatedCompany._id ? updatedCompany : company
    ));
  };


  // Function to approve a company
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/admin/companies/${id}/approve`, {}, {
        headers: { 'x-auth-token': token }
      });
      setCompanies(companies.map(company => 
        company._id === id ? { ...company, approved: true } : company
      ));
      alert('Company approved');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleCompanyAdded = (newCompany) => {
    setCompanies([newCompany, ...companies]);  // Add the new company to the top of the list
  };

  return (
    <div>
        <AddCompanyForm onCompanyAdded={handleCompanyAdded} /> {/* Render AddCompanyForm */}
      
      {/* Search Form */}
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {/* <h3>Search Companies</h3> */}
        <input style={{display:'flex',width:'50%',height:'30px'}}
          type="text"
          name="name"
          value={search.name}
          onChange={handleSearchInput}
          placeholder="Company Name"
        />
        <input style={{display:'flex',width:'50%',height:'30px'}}
          type="text"
          name="createdBy"
          value={search.createdBy}
          onChange={handleSearchInput}
          placeholder="Created By (Login ID)"
        />
        <button style={{display:'flex',width:'20%',height:'30px',alignItems:'center',justifyContent:'center'}}  onClick={handleSearch}>Search</button>
      </div>


      {/* <h2>Admin Dashboard</h2> */}


      <table border={1} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            
           <th>SNo.</th> {/* Add Serial Number Header */}
            <th>Company Name</th>
            <th>Created By</th>
            <th>Company Address</th>
            <th>Approval Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company ,index)=> (
            
            <tr key={company._id}>
            <td>{index + 1}</td>  {/* Serial Number Column */}

              <td>{company.name}</td>
              <td>{company.createdBy?.name} ({company.createdBy?.email})</td>
              <td>{company.address}</td>
              <td >{company.approved ? 'Approved' : 'Pending'}</td>
              <td>
                <button style={{backgroundColor:'red'}} onClick={() => handleDelete(company._id)}>Delete</button>
                <button style={{backgroundColor:'green'}} onClick={() => handleApprove(company._id)}>Approve</button>
              <a href={'#formpage'}><button  onClick={() => openEditModal(company)}>Edit</button></a> 

              </td>
            </tr>
          ))}
        </tbody>
      </table>
       
      {editCompany && (
        <EditModal
          company={editCompany}
          onClose={() => setEditCompany(null)} // Close the modal
          onUpdate={handleUpdate}  // Handle the update
        />
      )}

    </div>
  );
};

export default Admin
