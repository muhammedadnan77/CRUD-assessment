import React, { useState } from 'react';
import axios from 'axios';
import style from "../Components/home.module.css"


const AddCompanyForm = ({ onCompanyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  const { name, address } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/admin/companies', formData, {
        headers: { 'x-auth-token': token }
      });

      onCompanyAdded(res.data.company);  // Call the function to update the company list in the parent component
      setFormData({ name: '', address: '' });  // Reset the form after submission
      
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
   <div className={style.formpage}>
     <form onSubmit={onSubmit}>
      <h3>Add New Company</h3>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Company Name"
        required
      />
      <input
        type="text"
        name="address"
        value={address}
        onChange={onChange}
        placeholder="Company Address"
        required
      />
      <button type="submit">Add Company</button>
    </form>
   </div>
  );
};

export default AddCompanyForm;
