// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Home from './screen/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import Login from './screen/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screen/Signup.jsx';
import MyOrder from './screen/MyOrder.jsx';


function App(){
  return (
    
    <Router >
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/createuser' element={<Signup/>}/>
          <Route exact path='/myorder' element={<MyOrder/>}/>
        </Routes>
      </div>

    </Router>

)
};
  
export default App
