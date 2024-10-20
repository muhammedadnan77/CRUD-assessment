import React, { useState } from 'react';
import axios from 'axios';
import style from "../Components/home.module.css"


const EditModal = ({ company, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: company.name,
    
    address: company.address
  });

  const { name,  address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/admin/companies/${company._id}`, formData, {
        headers: { 'x-auth-token': token }
      });

      onUpdate(res.data.company);  // Call the onUpdate function passed from the parent
      onClose();  // Close the modal
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className={style.formpage}>
      <form onSubmit={onSubmit}>
        <h2>Edit Company</h2>
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
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditModal;
