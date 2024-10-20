import React, { useState } from 'react';
import axios from 'axios';
import style from "../Components/home.module.css"
import { Link } from 'react-router-dom';


const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  const { name, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/user/companies', formData, {

        headers: { 'x-auth-token': token }
      });
      alert('Company created');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
   <div className={style.formpage}>
     <form onSubmit={onSubmit}>
      <th>create company</th>
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
      <button type="submit">Create Company</button>
      <Link to="/companylists">company lists</Link>
    </form>
   </div>
  );
};

export default CreateCompany;