import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

function Individualclass() {


  const params = useParams();

  const logout = async()=>{
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", {onClose: ()=>(window.location.reload())});
  }

  const [classes, setClasses] = useState([]);

  async function fetchData(){
    try{
      const resp = await api.get('/getAllClasses');
      const res = resp.data.filter((data)=>(data.danceFormName===params.cn));
      setClasses(res);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  const[isloggedin, setLoggedin] = useState(false);
  useEffect(() => {
    fetchData();
    setLoggedin((sessionStorage.getItem('user') !== null)?true:false)

    document.title = 'IndividualClassPage';
  }, []);

  const handleClick = async (classId, vl)=>{
    openModal(`${String(vl).replace("/watch?v=","/embed/")}`);
    if(isloggedin){
      await api.post(`/addClick/${classId}`,{}, {withCredentials: true});
    }
  }

  const openModal = (url) => {
    const modal = document.querySelector("#myModal");
    const ifr = document.createElement("iframe");
    ifr.src = url;
    ifr.className = "modal-content"
    ifr.id = "iframe"
    ifr.style = "position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);width: 70%; height: 70%"
    modal.appendChild(ifr)
    modal.style.display = "block";
  }

  const closeModal = () => {
    const modal = document.querySelector("#myModal");
    const ifr = document.querySelector("#iframe");
    modal.removeChild(ifr);
    modal.style.display = "none";
  }
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
                  <Link className="nav-link" to="/Home" >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Classes" style={{ color: 'orange' }}>
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
        <div style={{ backgroundColor: '#0e0e0e', paddingBottom: '10px' }}>
          <div className="header">
            <h1 style={{fontWeight:"bold"}}>{params.cn} classes</h1>
          </div>
        </div>


        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
            {(classes.length===0)? <p style={{color: "white", fontSize:"1.8rem"}}>{"More classes coming soon....!" }</p> : classes.map((data)=>(
                <div key={data.id} style={{ width: '80%', maxWidth: '1000px', display: 'flex', border: '1px solid #686868', backgroundColor: '#282828', color: 'white', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 0 5px rgba(180, 180, 180, 0.1)', transition: 'box-shadow 0.3s', cursor: 'pointer' }} onClick={() => {handleClick(data.id,data.videoLink)}}>
                  <img src={`http://localhost:9000/getImage/${data.img}`} alt="Thumbnail" style={{ width: '30%', height: '150px', borderRadius: '5px 0 0 5px' }} />
                  <div style={{ padding: '10px' }}>
                    <h3 style={{ margin: '0' }}>{data.className}</h3>
                    <p style={{ marginTop: '15px', color: '#bfbfbf' }}>Tutor: {data.teacherName}</p>
                  </div>
                </div>
              ))}
        
        </div>



        <div id="myModal" onClick={closeModal} style={{ display: 'none', position: 'fixed', zIndex: 999, left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          
        </div>


        <Footer />
      </div>
    </div>
  )
}

export default Individualclass
