import classes from './App.module.scss';
import LibraryContext from './context/context-api';
import HomePage from './pages/homePage';
import LoginPage from './pages/login';
import SideBar from './components/sidebar';

import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
import axios from 'axios';
import ForgotPwd from './components/forgotpwd';
import Register from './pages/register';

const BASEAPI = 'http://localhost:8080';
const socketURL = `http://localhost:9000`;
const socket = socketClient(socketURL);

function App() {

  const [userLogin, setUserLogin] = useState({ state: false, name: "", id: "" });
  const [signIn, setSignIn] = useState({ state: true, email: "", password: "" });
  const [signUp, setSignUp] = useState({ state: false, email: "", name: "", number: "", password: "" });
  const [sidebar, setSidebar] = useState(false)

  // console.log(JSON.parse(localStorage.getItem('logIn')));

  const authGetUser = () => {
    axios.get(`${BASEAPI}/user/get/${JSON.parse(localStorage.getItem('logIn'))}`,
      {
        withCredentials: true
      }).then(res => {
      }).catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          axios.get(`${BASEAPI}/auth/refresh`, { withCredentials: true }).then(res => {
            if (res.status === 200 && localStorage.getItem('a')) {
              authGetUser();
            }
          }).catch(err => {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
              localStorage.removeItem('logIn');
              setUserLogin({ ...userLogin, state: false });
            }
          })
        }
      })
  }

  useEffect(() => {
    authGetUser();
  }, [])

  return (
    <LibraryContext.Provider value={{ BASEAPI, socket, userLogin, setUserLogin, signIn, setSignIn, signUp, setSignUp, sidebar, setSidebar }}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to="/sign-in" />} />
          {/* make different components for login and signup */}
          <Route exact path='/sign-in' element={<LoginPage />} />
          <Route exact path='/sign-up' element={<Register />} />
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path='/reset-password' element={<ForgotPwd />} />
          {/* <Route exact path='/register/:id' element={<ForgotPwd />} /> */}
          <Route exact path='*' element={<HomePage />} />
        </Routes>
        <SideBar/>
      </BrowserRouter>
    </LibraryContext.Provider>
  );
}

export default App;
