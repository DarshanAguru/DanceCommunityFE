import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../assets/styles/institutions.css";
import Footer from '../components/Footer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

function Institutions() {
  const logout = async () => {
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", { onClose: () => (window.location.reload()) });
  }

  const [isloggedin, setLoggedin] = useState(false);
  const [institution, setInstitution] = useState({});
  const [institutions, setInstitutions] = useState([]);
  async function fetchData() {
    try {
      const resp = await api.get('/getAllInstitutions')
      console.log(resp);
      setInstitutions(resp.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    fetchData();
    setAdmin((sessionStorage.getItem('user') !== null) ? ((JSON.parse(sessionStorage.getItem('user')).type === 'user') ? false : true) : false);
    setLoggedin((sessionStorage.getItem('user') !== null) ? true : false)

    document.title = 'InstitutionsPage';
  }, []);


  return (
    <div>
      <ToastContainer />
      <div style={{ background: '#0e0e0e' }}>
        <nav className="navbar navbar-expand-lg sticky-top bg-black">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="../../images/logo.jpg" alt="logoimg" className="img-fluid" style={{
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

        <section className="py-5">
          <div className="px-4">
            <h1 className="text-center mb-4">List of Institutions</h1>
            <div className="row">
              <div className="col">
                {(isAdmin) && (<button type="button" className="butt float-end mb-3" style={{ marginRight: '222px' }}>
                  <Link to="/AddInstitution">Add Institution</Link>
                </button>)
                }
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-8" style={{ overflowX: 'auto' }}>
                {(institutions.length === 0)?<p style={{color: "white", fontSize:"1.4rem"}}>No institutions found</p> : institutions.map((data) => (
                  <div key={data.id} className="card" onClick={(e)=>{e.preventDefault();setInstitution(data)}} data-bs-toggle="modal" data-bs-target="#institutionModal">
                    <div className="card-body">
                      <div>
                        <h5 className="card-title"><b>Institute Name:</b> {data.institutionName}</h5>
                        <p className="card-text"> <b>Location:</b> {data.location}</p>
                      </div>
                    </div>
                  </div>

                ))}

                
              </div>
            </div>

          </div>
        </section>



        <div className="modal fade" id="institutionModal" tabIndex="-1" aria-labelledby="institutionModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="institutionModalLabel">Institution Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              {
                <div key={institution.id} className="modal-body">

                  <div className="column">
                    <h5 className="modal-title">{institution.intitutionName}</h5>
                    <p><b>Head of the Institution:</b> {institution.headOfInstitution}</p>
                    <p><b>Courses offered:</b> {institution.coursesOffered}</p>
                    <p><b>Additional Information:</b> {institution.additionalOffers}</p>
                  </div>

                  <div className="column">
                    <h5 className="modal-title">Contact Information</h5>
                    <p><b>Phone Number:</b> {institution.phone}</p>
                    <p><b>Email:</b> {institution.email}</p>
                    <p><b>Address:</b>{institution.address}</p>
                  </div>
                </div>
              }
              
            </div>
          </div>
        </div>











        <Footer />
      </div>
    </div>
  )
}

export default Institutions
