import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../assets/styles/homestyles.css";
import Footer from '../components/Footer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

function Profile() {

  const logout = async()=>{
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", {onClose: ()=>(window.location.reload()), autoClose: 1600});
  }

  const[isloggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState({});
    useEffect(() => {
      setLoggedin((sessionStorage.getItem('user') !== null)?true:false)
      if(sessionStorage.getItem('user') !== null)
      {
        setUser(JSON.parse(sessionStorage.getItem('user')));
      }
        document.title = 'ProfilePage';
      }, []);
  return (
    <div>
      <ToastContainer/>
<div style={{ background: '#0e0e0e' }}>
        <nav className="navbar navbar-expand-lg sticky-top bg-black">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src="../../images/logo.jpg"
                alt="logoimg"
                className="img-fluid"
                style={{
                  maxHeight: '50px',
                  maxWidth: '30%',
                  marginTop: '4px',
                  marginLeft: '30px',
                  marginRight: '400px',
                }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/Home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Classes">
                    Classes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Institutions">
                    Institutions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Auditions">
                    Auditions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Events">
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contactus">
                    ContactUs
                  </a>
                </li>
                {(isloggedin) &&  (<li className='nav-item'>
                  <Link className='nav-link' to='/Profile'>Profile</Link>
                </li>)}
                <li className="nav-item">
                  {!isloggedin && <Link className="nav-link" to="/Signup">
                    Join
                  </Link>
                  }
                  {
                    isloggedin && (<button onClick={logout} style={{color: "white"}} className="nav-link">Logout</button>)
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>

      <div style={{ marginTop: '50px', backgroundColor: '#0e0e0e', height: '50vh', display: 'flex', justifyContent: 'center', marginBottom:'20px'}}>
          <div style={{ backgroundColor: '#171717', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', color: 'white', width: '60%', padding: '20px' }}>
                    <h4 className='text-center'>Hi {user.name}</h4>
                <div className='px-4 py-4'>
                    <h6>Name: {user.name}</h6>
                    <h6>email: {user.email}</h6>
                    <h6>phone no: {user.phone}</h6>
                    <h6>country: {user.country}</h6>
                    <h6>State: {user.state}</h6>
                    <h6>City: {user.city}</h6>
                    <h6>creator: {(user.type === 'user')?"No":"Yes"}</h6>
                </div>
          </div>
    </div>

    <Footer/>
    </div>
    </div>
  )
}

export default Profile
