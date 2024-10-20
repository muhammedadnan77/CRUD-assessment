import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "../Components/home.module.css"



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate()

   
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
  
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/userdashboard'); // Redirect users to their dashboard
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <div className={style.formpage}>
      <form onSubmit={onSubmit}>
      <h2>Login</h2>

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
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
