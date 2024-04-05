import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';


function AddAudition() {

  const navigate = useNavigate()

  const logout = async () => {
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", { onClose: () => (window.location.reload()) });
  }

  const [isloggedin, setLoggedin] = useState(false);
  const [id, setId] = useState("");



  useEffect(() => {
    document.title = 'AddAuditionPage';
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
    title: "",
    requirements: "",
    date: "",
    additionalInfo: "",
    location: "",
    phone: "",
    email: "",
    address: ""
  }
  const [values, setValues] = useState(initialValues)
  const [file, setFile] = useState()

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, });
  }

  const handleFilepload = (e) => {
    const filee = e.target.files[0];
    setFile(filee)
  }

  const submitForm = async () => {
    try {
      const resText = await api.post(`/addAudition/${id}`, { userId: id, title: values.title, requirements: values.requirements, date: values.date, additionalInfo: values.additionalInfo, location: values.location, phone: values.phone, email: values.email, address: values.address })
      console.log(resText)
      const auditionId = resText.data.id;
      const fd = new FormData();
      fd.append('img', file);
      const resFile = await api.post(`/uploadFile/auditions/${auditionId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      console.log(resFile);
      toast.success("Your Audition Added Successfully", {onClose: ()=>{navigate("/Auditions")}, autoClose: 1600})
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
                  <Link className="nav-link" to="/Institutions">
                    Institutions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Auditions" style={{ color: 'orange' }}>
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

        <h2 className="text-center text-white " style={{ marginBottom: '100px' }}>Register Your Audition Here</h2>

        <div style={{ marginTop: '50px', backgroundColor: '#0e0e0e', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#171717', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', color: 'white', width: '60%', padding: '20px' }}>
            <form method="post" action="#" id="addAuditionForm" encType='multipart/form-data'>
              <div className="mb-3">
                <label htmlFor="title"   className="form-label  ">Audition Title</label>
                <input style={{color: "white"}} name="title" required={true} onChange={handleInputchange} value={values.title} type="text" className="form-control bg-dark" id="title" placeholder="Enter audition title" />
              </div>
              <div className="mb-3">
                <label htmlFor="requirements" className="form-label ">Requirements</label>
                <input style={{color: "white"}} type="text" name="requirements" required={true} onChange={handleInputchange} value={values.requirements} className="form-control bg-dark" id="requirements" placeholder="Enter Requirements" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label  ">Date of Audition</label>
                <input style={{color: "white"}} type="date" name="date" required={true} onChange={handleInputchange} value={values.date} className="form-control bg-dark" id="date" placeholder="Enter Date of Audition" />
              </div>
              <div className="mb-3">
                <label htmlFor="Poster" className="form-label ">Upload Poster</label> <br />
                <input style={{color: "white"}} type="file" name="files" onChange={handleFilepload} className="form-control-file text-white" id="Poster" />
              </div>
              <div className="mb-3">
                <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
                <textarea style={{color: "white"}} name="additionalInfo" required={true} onChange={handleInputchange} value={values.additionalInfo} className="form-control bg-dark" id="additionalInfo" rows="3" placeholder="Enter addition information like about audition, timings"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label  ">Location</label>
                <input style={{color: "white"}} type="text" name="locations" required={true} onChange={handleInputchange} value={values.locations} className="form-control bg-dark" id="Location" placeholder="Location city" />
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="phone" className="form-label  ">Phone Number</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-dark text-white border border-white border-opacity-50  ">+91</span>
                    <input style={{color: "white"}} type="text" name="phone" required={true} onChange={handleInputchange} value={values.phone} className="form-control bg-dark" id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="email" className="form-label  ">Email</label>
                  <input style={{color: "white"}} type="email" name="email" required={true} onChange={handleInputchange} value={values.email} className="form-control bg-dark" id="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label  ">Address</label>
                <textarea style={{color: "white"}} name="address" required={true} onChange={handleInputchange} value={values.address} className="form-control bg-dark" id="address" rows="3" placeholder="Enter address"></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="button" onClick={submitForm} className="btn btn-dark" style={{ backgroundColor: 'rgba(0, 0, 20, 0.2)', color: 'white', borderColor: 'white' }}>Submit</button>
                <Link to="/institutions" className="btn btn-secondary" style={{ marginLeft: '20px' }}>Cancel</Link>
              </div>
            </form>
          </div>
        </div>

      </div >
    </div>





  )
}

export default AddAudition
