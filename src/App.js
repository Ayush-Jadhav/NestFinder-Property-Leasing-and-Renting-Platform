import './App.css';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Form from './Pages/Form';
import Home from './Pages/Home';
import About from './Pages/About';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai"
import VerifyEmail from './Pages/verifyEmail';
import { logOut } from './Services/Operations/authApi';
import { useState,useEffect } from 'react';
import Dashboard from './Pages/Dashboard';
import MyProfile  from './Components/Dashboard/MyProfile';
import { PropertyList } from './Components/Dashboard/PropertyList';
import OpenRoute from './Components/Auth/OpenRoute';
import { PrivateRoute } from './Components/Auth/PrivateRoute';
import { PrivateUpdateCardRoute } from './Components/Auth/PrivateRoute';
import { Register } from './Pages/RegisterProperty/Register';
import Settings from './Components/Dashboard/setting/index';
import { ProrpertyBasics } from './Components/RegisterPropertyPages/ProrpertyBasics';
import { PropertyAddress } from './Components/RegisterPropertyPages/PropertyAddress';
import { PropertyMedia } from './Components/RegisterPropertyPages/PropertyMedia';
import { PropertyAdditionalInfo } from './Components/RegisterPropertyPages/PropertyAdditionalInfo';
import PropertyUpdateCard from './Components/PropertyListCard/propertyUpdateCard';
import SearchResults from './Pages/SearchPage';
import React from 'react';
import ConfirmationModal from './Components/ConfirmationModal';
import ForgotPassword from './Pages/ForgetPassword';
import UpdatePassword from './Pages/UpdatePassword';
import Error from './Pages/Error';


function App() {
  const token = useSelector((state) => (state.user.token));
  const user = useSelector((state)=>(state.user.user));

  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={()=>{navigate("/")}}>NestFinder</div>
        <ul className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <li>Home</li>
          </NavLink>

          <NavLink to="/About" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <li>About</li>
          </NavLink>

          {
            token === null && <NavLink to="/SignUp" className={({ isActive }) => (isActive ? 'active-link' : '')} >
            <li>SignUp/LogIn</li>
          </NavLink>
          }

          { 
            token !== null && 
            <>

              <div className="dropdown">
                <div className="profile">
                  <img src={user?.image} alt={`profile-${user?.firstName}`} />
                </div>
                <span className='Arrowbox'>
                  <span className="dropdownArrow" />
                </span>
                <div className="profileDropdown">
                    <ul>
                      <NavLink to="/Register/PostProperty/Basics">
                        <li>Register</li>
                      </NavLink>
                      <NavLink to="/dashboard/my-Properties">
                        <li>Dashboard</li>
                      </NavLink>
                      <li onClick={() =>
                                    setConfirmationModal({
                                      text1: "Are you sure?",
                                      text2: "You will be logged out of your account.",
                                      btn1Text: "Logout",
                                      btn2Text: "Cancel",
                                      btn1Handler: () => dispatch(logOut(navigate)),
                                      btn2Handler: () => setConfirmationModal(null),
                                  })}>LogOut</li>
                    </ul>
                </div>
              </div>
              {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            </> 
          }
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/SignUp" element={
            <OpenRoute>
              <Form />
            </OpenRoute>
            }/>
          <Route path='/verify-email' element={
            <OpenRoute>
              <VerifyEmail/>
          </OpenRoute>}
          />
          <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
          <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
          <Route path="/search" element={<SearchResults/>}/>
          <Route path="*" element={<Error />} />
          <Route  element={
            <PrivateRoute>
              <Register/>
            </PrivateRoute>}>
            <Route path='/Register/PostProperty/Basics' element={<ProrpertyBasics/>}/>
            <Route path='/Register/PostProperty/Address' element={<PropertyAddress/>}/>
            <Route path='/Register/PostProperty/Media' element={<PropertyMedia/>}/>
            <Route path='/Register/PostProperty/AdditionalInfo' element={<PropertyAdditionalInfo/>}/>
          </Route>
          <Route element={
            <PrivateRoute>
                <Dashboard/>
            </PrivateRoute>
              }>
            <Route path="dashboard/my-profile" element={<MyProfile/>} />
            <Route path="/dashboard/my-Properties" element={<PropertyList/>} />
            <Route path='/dashboard/settings' element={<Settings/>}/>
            <Route path='/dashboard/property/update' element={
              <PrivateUpdateCardRoute>
                <PropertyUpdateCard/>
              </PrivateUpdateCardRoute>
              }/>
          </Route>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
