import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx'
import "../assets/styles/auditions.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

function Auditions() {

  const logout = async () => {
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", { onClose: () => (window.location.reload()) });
  }

  const [isloggedin, setLoggedin] = useState(false);
  const [auditions, setAuditions] = useState([]);
  const [audition, setAudition] = useState({});
  async function fetchData() {
    try {
      const resp = await api.get('/getAllAuditions')
      console.log(resp);
      setAuditions(resp.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    fetchData();
    setAdmin((sessionStorage.getItem('user') !== null) ? ((JSON.parse(sessionStorage.getItem('user')).type === 'user') ? false : true) : false);
    document.title = 'AuditionsPage';
    setLoggedin((sessionStorage.getItem('user') !== null) ? true : false)
  }, []);

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

        <div className="header">
          <h1>Auditions</h1>
          <p>Come and discover your talent with us!. Unleash your passion on the stage!</p>
          <div className="col">
            <Link to="/AddAudition">
              {(isAdmin) && (<button type="button" className="butt float-end mb-3" style={{ marginRight: '222px' }}>
                Add audition
              </button>)
              }
            </Link>
          </div>
        </div>
        <section>
          <div className="container flex justify-content-center">

            {(auditions.length === 0 )?<p style={{color: "white", fontSize: "1.4rem"}}> No auditions Found</p>:auditions.map((data) => (
              <div key={data.id} className="audcard" onClick={(e)=>{e.preventDefault();setAudition(data)}} data-bs-toggle="modal" data-bs-target="#auditionModal">
                <img  src={`http://localhost:9000/getImage/${data.img}`} alt="Audition img" />
                <div className="audcard-details">
                  <h4>{data.title}</h4>
                  <p><strong>Audition for:</strong> {data.requirements}</p>
                  <p><strong>Location:</strong> {data.location}</p>
                  <p><strong>Date :</strong> {data.date}</p>
                </div>
              </div>
            ))}

          </div>
        </section>

        <div className="modal fade" id="auditionModal" tabIndex="-1" aria-labelledby="auditionModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="auditionModalLabel">Audition Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* {auditions.map((data) => ( */}
                  <div className="row">
                    <div className="col-md-6">
                      {/* Left side content */}
                      <h5 className="heading">{audition.title}</h5>
                      <p><b>Requirements : </b>{audition.requirements}</p>
                      <p><b>Date of Audition :</b>{audition.date}</p>
                      {/* <p><b>Additional Information : </b> Some additional information here.</p> */}
                      <br />
                      <h5 className="heading">Contact Information</h5>
                      <p><b>Phone Number :</b>{audition.phone}</p>
                      <p><b>Email :</b>{audition.email}</p>
                      <p><b>Address :</b>{audition.address}</p>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                      {/* Right side content (picture) */}
                      <img  src={`http://localhost:9000/getImage/${audition.img}`} className="img-fluid" style={{ height: '350px', width: '400px', objectFit: 'fill' }} alt="Audition Picture" />
                    </div>
                  </div>
                

              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

    </div>
  )
}

export default Auditions
