import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from "../Components/home.module.css"

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username:'',
    email: '',
    password: '',
    role: 'IT_USER', // Default role
    mobile:''
  });

  const { name, username, email, password, role , mobile} = formData;

  const navigate = useNavigate()

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data); // Handle success (e.g., show message or redirect)
      navigate('/login')
    } catch (err) {
      console.error(err.response.data); // Handle error
    }
  };

  return (
 <div className={style.formpage}>

     <form onSubmit={onSubmit}>
      <h2>Sign Up</h2>
    <input
      type="text"
      name="name"
      value={name}
      onChange={onChange}
      placeholder="Name"
      required
    />
    <input
      type="text"
      name="username"
      value={username}
      onChange={onChange}
      placeholder="username"
      required
    />

    <input
      type="email"
      name="email"
      value={email}
      onChange={onChange}
      placeholder="Email"
      required
    />
    <input
      type="password"
      name="password"
      value={password}
      onChange={onChange}
      placeholder="Password"
      required
    />
    <input
      type="text"
      name="mobile"
      value={mobile}
      onChange={onChange}
      placeholder="phoneNumber"
      required
    />
    <select name="role" value={role} onChange={onChange}>
      <option value="user">IT_USER</option>
      <option value="admin">IT_ADMIN</option>
    </select>
    <button type="submit">Register</button>
    <Link to="/login">already have an account? login</Link>
  </form>
 </div>
  );
};

export default Register;
