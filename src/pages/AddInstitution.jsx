import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';




function Addinstitution() {

  const navigate = useNavigate();

  const logout = async () => {
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", { onClose: () => (window.location.reload()), autoClose: 1600 });
  }
 

  const [isloggedin, setLoggedin] = useState(false);
  const[id, setId] = useState("");

  useEffect(() => {
    document.title = 'AddInstitutionPage';
  
    const val = (sessionStorage.getItem('user') !== null)?((JSON.parse(sessionStorage.getItem('user')).type === 'user')?false:true):false;
    if(!val){navigate('/Home')}
    setLoggedin((sessionStorage.getItem('user') !== null) ? true : false)
    if(sessionStorage.getItem('user')!==null)
    {
      
      const { id } = JSON.parse(sessionStorage.getItem('user'));
      setId(id);
    }

  }, []);


  const initialValues = {
    institutionName: "",
    headOfInstitution:"",
    coursesOffered:"",
    additionalOffers:"",
    location:"",
    phone:"",
    email:"",
    address:""
  }
  const [values, setValues] = useState(initialValues)

  const handleInputchange = (e)=>
  {
      const { name, value } = e.target;
      setValues({...values, [name]: value,});
  }

  const submitForm = async () => {
    try {
      const resText = await api.post(`/addInstitution/${id}`, { userId: id, institutionName: values.institutionName, headOfInstitution: values.headOfInstitution, coursesOffered: values.coursesOffered, additionalOffers: values.additionalOffers,location: values.location,phone: values.phone,email: values.email,address: values.address })
      console.log(resText)
      toast.success("Your Institution Added Successfully", {onClose: ()=>{navigate("/Institutions")}, autoClose: 1600})
    }
    catch (err) {
      toast.error("Something went wrong... please try again later", {autoClose: 1600})
      console.log(err);
    }
  }

  return (
    <div>
      <ToastContainer />
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
                  <Link className="nav-link" to="/Home" >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Classes">
                    Classes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Institutions" style={{ color: 'orange' }}>
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
                    isloggedin && (<button onClick={logout} style={{ color: "white" }} className="nav-link">Logout</button>)
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h2 className="text-center text-white mt-24">Register Your Institution Here</h2>

        <div style={{ marginTop: '50px', backgroundColor: '#0e0e0e', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#171717', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', color: 'white', width: '60%', padding: '20px' }}>
            <form method="post" action="" id="addInstitutionForm" encType='multipart/form-data'>
              <div className="mb-3">
                <label htmlFor="institutionName" className="form-label">Institution Name</label>
                <input type="text" style={{color: "white"}} name="institutionName" required={true} onChange={handleInputchange} value={values.institutionName} className="form-control bg-dark" id="institutionName" placeholder="Enter institution name" />
              </div>
              <div className="mb-3">
                <label htmlFor="headOfInstitution" className="form-label">Head of Institution</label>
                <input type="text" style={{color: "white"}} name="headOfInstitution" required={true} onChange={handleInputchange} value={values.headOfInstitution} className="form-control bg-dark" id="headOfInstitution" placeholder="Enter head of institution" />
              </div>
              <div className="mb-3">
                <label htmlFor="coursesOffered" className="form-label">Courses offered</label>
                <input type="text" style={{color: "white"}} name="coursesOffered" required={true} onChange={handleInputchange} value={values.coursesOffered} className="form-control bg-dark" id="coursesOffered" placeholder="Enter dance forms being taught" />
              </div>
              <div className="mb-3">
                <label htmlFor="additionalOffers" className="form-label">Additional Information</label>
                <textarea name="additionalOffers" style={{color: "white"}} required={true} onChange={handleInputchange} value={values.additionalOffers} className="form-control bg-dark" id="additionalOffers" rows="3" placeholder="Enter addition information like fees, timings, facilities.." />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" name="location" style={{color: "white"}} required={true} onChange={handleInputchange} value={values.location} className="form-control bg-dark" id="Location" placeholder="Location city" />
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text" style={{ backgroundColor: '#303030', border: '0.1px #757575 solid', color: 'white' }}>+91</span>
                    <input type="text" name="phone"  style={{color: "white"}} required={true} onChange={handleInputchange} value={values.phone}  className="form-control bg-dark" id="phone" placeholder="Enter phone number"  />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" style={{color: "white"}} required={true} onChange={handleInputchange} value={values.email} className="form-control bg-dark" id="email" placeholder="Enter email"  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea name="address" style={{color: "white"}} required={true} onChange={handleInputchange} value={values.address} className="form-control bg-dark" id="address" rows="3" placeholder="Enter address" />
              </div>

              <div className="d-flex justify-content-center">
                <button type="button" onClick={submitForm} className="btn btn-dark"  style={{ backgroundColor: 'rgba(0, 0, 20, 0.2)', color: 'white', borderColor: 'white' }}>Submit</button>
                <Link to="/institutions" className="btn btn-secondary" style={{ marginLeft: '20px' }}>Cancel</Link>

              </div>
            </form>
          </div>
        </div>




<Footer/>

      </div>
    </div>

  )
}

export default Addinstitution;
