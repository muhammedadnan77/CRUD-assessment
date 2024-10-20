import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateCompany from './Components/CreateCompany';
import UserDashboard from './Components/UserDashboard';
import Admin from './Components/Admin';
import UserCompanies from './Components/UserCompanies';

function App() {
  return (
  <div>
    <BrowserRouter>
    <Routes>
    <Route element={<Register></Register>} path='/'></Route>
    <Route element={<Login></Login>} path='/login'></Route>
    <Route element={<CreateCompany></CreateCompany>} path='/createcompany'></Route>
     <Route element={<UserDashboard></UserDashboard>} path='/userdashboard'></Route>
     <Route element={<Admin></Admin>} path='/admin'></Route>
     <Route element={<UserCompanies></UserCompanies>} path='/companylists'></Route>
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
