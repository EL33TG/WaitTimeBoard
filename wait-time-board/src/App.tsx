import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route,  Navigate, useLocation } from 'react-router-dom';
import './App.css';

import WaitTimeManagementPage from './Pages/WaitTimeManagementPage'
import FacultyManagementPage from './Pages/FacultyManagementPage';
import WaitTimeBoardPage from './Pages/WaitTimeBoardPage' 
import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage'

import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { loginRequest } from './AuthConfig'

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal()

  const handleLogin = () => {
    if (isAuthenticated) { return }
    instance.loginRedirect(loginRequest).catch(e => {
      console.log(e);
    });
  }

  return true ? (
    <div className="App">
      <Router>
        <Routes>
          {/* ROUTES */}
          <Route path="/"               element={<DashboardPage/>}/>
          <Route path="wait-time-board" element={<WaitTimeBoardPage/>}/>
          <Route path="management"      element={<WaitTimeManagementPage/>}/>
          <Route path="faculty"         element={<FacultyManagementPage/>}/>
          {/* 404 */}
          <Route path="*"               element={<Navigate to="/"/>}/>
          
        </Routes>
      </Router>
    </div>
  ) : (
  <>
  <div style={{padding:"20px"}}>
    <div>Insufficient Authentication Permissions</div>
    <div style={{width:"100px"}}><button onClick={() => handleLogin()}>Login</button></div>
  </div>
  </>)
}

export default App;
