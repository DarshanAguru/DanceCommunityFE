import  { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../utils/api';


export default function Signup() {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'SignupPage';
    if(sessionStorage.getItem('user') !== null)
    {
      navigate('/Home');
    }
  }, []);


  const initialValues = {
    name: "",
    email: "",
    phone: "",
    country: "",
    state:"",
    city:"",
    supassword: ""
};

const initialLoginVals = {
  email: "",
  password: ""
};

const [userType , setUsertype] = useState("user");
const [values, setValues] = useState(initialValues);
const [logindet, setLogindet] = useState(initialLoginVals);
const [wrong, setWrong] = useState("red");

const handleLoginChange = (e) => {
  const { name, value } = e.target;
  setLogindet({
    ...logindet,
    [name]: value,
  });
  }

const handleInputChange = (e) => {
const { name, value } = e.target;
setValues({
  ...values,
  [name]: value,
});
}

  async function submitFormData(){
    try{
    const res = await api.post('/register',{name:values.name, pswd:values.supassword,type:userType, email:values.email, country: values.country, city: values.city, state: values.state, phone: values.phone})
    console.log(res);
    toast.success('Registered successfully');
    }
    catch(err)
    {
      toast.error("Something went wrong... Please Try again Later");
      console.log(err);
    }
  }


  async function handleLogin(){
    try{
    if(logindet.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) && logindet.password!=="")
    {
    const res = await api.post('/login',{email:logindet.email, pswd:logindet.password})
    console.log(res);
    sessionStorage.setItem('user', JSON.stringify(res.data));
    toast.success("Logged-in successfully", {onClose: ()=>(navigate('/Home')), autoClose: 1995});
    }
    else{
      toast.error("Invalid Credentials");
    }
    }
    catch(err)
    {
      toast.error("Invalid credentials!");
      console.log(err);
    }
  }

  return (
    
    <div>
   
   <ToastContainer />
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
              </ul>
            </div>
          </div>
        </nav>
       

<div style={{ backgroundColor: '#191919', padding: '20px', borderRadius: '10px', margin: '50px auto', width: '800px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', display: 'flex', flexDirection: 'row' }}>
  <div className="form-container" style={{ flex: '1', padding: '20px' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Login</h2>
    <form method="post" action="">
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="username" style={{ color: 'white' }}>Email:</label>
        <input type="text" id="username" name="email" onChange={handleLoginChange} value={logindet.email} required={true} placeholder="Enter your username or email" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="password" style={{ color: 'white' }}>Password:</label>
        <input type="password" id="password" name="password" onChange={handleLoginChange} value={logindet.password} required={true} placeholder="Enter your password" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      {/* <div className="form-group" style={{ marginBottom: '10px' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Forgot password?</a>
      </div> */}
      <div className="form-group">
        <button type="button" onClick={handleLogin} style={{ width: '30%', padding: '7px', border: 'none', borderRadius: '5px', boxSizing: 'border-box', fontSize: '16px', cursor: 'pointer', backgroundColor: 'orange', color: 'white', marginTop: '10px' }}>Login</button>
      </div>
    </form>

    <div>
      <h4 style={{ marginTop: '80px', color: 'white' }}>contact-us</h4>
      <p style={{ color: 'white' }} ><b style={{ color: 'white' }}>call :</b> +91 9876543210</p>
      <p style={{ color: 'white' }}>contact@nrityasahachara.com</p>
      <p style={{ color: 'white' }}>get connected with us on social networks :</p>
      <div className="icons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-facebook-f" style={{ color: 'rgb(53, 176, 217)' }}></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-twitter" style={{ color: 'rgb(53, 176, 217)' }}></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-instagram" style={{ color: 'rgb(53, 176, 217)' }}></i>
        </a>
      </div>
    </div>
  </div>

  <div className="divider" style={{ borderRight: '1px solid white', margin: '0 20px' }}></div>

  <div className="form-container" style={{ flex: '1', padding: '20px' }}>
    <h2 style={{ color: 'white' }}>Signup</h2>
    <form method="post" action="">
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="name" style={{ color: 'white' }}>Name:</label>
        <input type="text" id="name" name="name" required={true} onChange={handleInputChange} value={values.name} placeholder="Enter your name" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="email" style={{ color: 'white' }}>Email:</label>
        <input type="email" id="email" name="email"  required={true} onChange={handleInputChange} value={values.email} placeholder="Enter your email" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="phone" style={{ color: 'white' }}>Phone Number:</label>
        <input type="tel" id="phone" name="phone" required={true} onChange={handleInputChange} value={values.phone} placeholder="Enter your phone number" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="country" style={{ color: 'white' }}>Country:</label>
        <input type="text" id="country" name="country" required={true} onChange={handleInputChange} value={values.country} placeholder="Enter your country" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="state" style={{ color: 'white' }}>State:</label>
        <input type="text" id="state" name="state" required={true} onChange={handleInputChange} value={values.state}  placeholder="Enter your state" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="city" style={{ color: 'white' }}>City:</label>
        <input type="text" id="city" name="city" required={true} onChange={handleInputChange} value={values.city} placeholder="Enter your city" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="signup-password" style={{ color: 'white' }}>Password:</label>
        <input type="password" id="supassword" required={true} name="supassword" onChange={handleInputChange} value={values.supassword} placeholder="Choose a password" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: '1px solid rgb(72, 72, 72)', borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
      </div>
      <div className="form-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="confirm-password" style={{ color: 'white' }}>Confirm Password:</label>
        <input type="password" id="sucpassword" required={true} onChange={(e)=>{(e.target.value !== values.supassword)? setWrong("red"): setWrong("green")}}  placeholder="Confirm your password" style={{ width: 'calc(100% - 20px)', padding: '5px 10px', border: `1px solid rgb(72,72,72)`, borderRadius: '5px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#282828', color: 'white' }} />
        <span style={{color: `${wrong}`, fontSize:"10px"}}>{(wrong === 'red')?"Password didn't match":"Password matched"}</span>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '0', color: 'white' }}>For Creator Account : </p>
        <input type="checkbox" id="isCreator" name="isCreator" onChange={(e)=>{(e.target.checked)?setUsertype("admin"):setUsertype("user")}} style={{ marginLeft: '40px', color: 'white' }} />
        <label htmlFor="creatorAccount" style={{ color: 'white' }}>Creator Account</label>
      </div>
      <div className="form-group">
        <button type="button" onClick={()=>((wrong === 'green')?submitFormData() : alert("Passwords didn't matched"))} style={{ width: '30%', padding: '7px', border: 'none', borderRadius: '5px', boxSizing: 'border-box', fontSize: '16px', cursor: 'pointer', backgroundColor: 'orange', color: 'white', marginTop: '10px' }}>Signup</button>
      </div>
    </form>
  </div>
</div>


    </div>
  )
}
