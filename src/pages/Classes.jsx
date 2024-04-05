import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer.jsx'
import "../assets/styles/classes.css";
import api from '../utils/api';

function Classes() {


  const navigate = useNavigate();

  const logout = async()=>{
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", {onClose: ()=>(window.location.reload())});
  }

  const[isloggedin, setLoggedin] = useState(false);
  const[id, setId] = useState("");

  const[isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    document.title = 'ClassessPage';
   
    setAdmin((sessionStorage.getItem('user') !== null)?((JSON.parse(sessionStorage.getItem('user')).type === 'user')?false:true):false);
    setLoggedin((sessionStorage.getItem('user') !== null)?true:false)
    if(sessionStorage.getItem('user')!==null)
    {
      
      const { id } = JSON.parse(sessionStorage.getItem('user'));
      setId(id);
    }
  }, []);

  

  const initialValues = {
    danceFormName: "",
    className:"",
    classLink:"",
    teacherName:""
  }
  const [values, setValues] = useState(initialValues)
  const [file, setFile] = useState()

  const handleInputchange = (e)=>
  {
      const { name, value } = e.target;
      setValues({...values, [name]: value,});
  }

  const handleFilepload = (e)=>{
    const filee = e.target.files[0];
    setFile(filee)
  }

  const submitForm = async ()=>{
      try{
        // console.log(values)
        const resText = await api.post(`/addClass/${id}`, {userId: id, danceFormName: values.danceFormName, className: values.className, teacherName: values.teacherName, videoLink: values.classLink})
        console.log(resText)
        const classId = resText.data.id;
        const fd = new FormData();
        fd.append('img',file);
        const resFile = await api.post(`/uploadFile/classes/${classId}`, fd, {headers: {'Content-Type':'multipart/form-data'}})
        console.log(resFile);
        toast.success("Class Added Successfully", {onClose: ()=>{setValues(initialValues)} ,autoClose: 1600})
      }
      catch(err)
      {
        toast.error("Something went wrong... please try again later")
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
                  <Link className="nav-link" to="/" style={{ color: 'orange' }}>
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


        <div className="header">
          <h1>Online Dance Classes</h1>
          <p>Welcome to our platform for online classical dance classes.</p>
          <div className="col">
            {(isAdmin) && (<button type="button" className="butt float-end mb-3" data-toggle="modal" data-target="#addClassesModal">
              Add Classes
            </button>)
            }
          </div>
        </div>

        

          <div className="featured-dance" style={{ margin: 'auto 80px', marginTop: '50px' }}>
            <div className="dance-card dance-class">
              <img src="../../images/bharatanatyamclass.jpg" alt="Bharatanatyam" />
              <h5>Bharatanatyam</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Bharatnatyam')}}>view classes</button>
            </div>


            <div className="dance-card dance-class">
              <img src="../../images/kathakclass.jpg" alt="Kathak" />
              <h5>Kathak</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Kathak')}}>view classes</button>
            </div>

            <div className="dance-card dance-class">
              <img src="../../images/odissiclass.jpg" alt="Odissi" />
              <h5>Odissi</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Odissi')}}>view classes</button>
            </div>

            <div className="dance-card dance-class">
              <img src="../../images/kuchipudiclass.jpeg" alt="Kuchipudi" />
              <h5>Kuchipudi</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Kuchipudi')}}>view classes</button>
            </div>

            <div className="dance-card dance-class">
              <img src="../../images/Manipuriclass.jpg" alt="Manipuri" />
              <h5>Manipuri</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Manipuri')}}>view classes</button>
            </div>

            <div className="dance-card dance-class">
              <img src="../../images/bhangraclass.jpeg" alt="Bhangra" />
              <h5>Bhangra</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Bhangra')}}>view classes</button>
            </div>

            <div className="dance-card dance-class">
              <img src="../../images/keralaclass.jpg" alt="Kerala Natanam" />
              <h5>Kerala Natanam</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/KeralaNatanam')}}>view classes</button>
            </div>

            <div className="dance-card dance-class">
              <img src="../../images/sattriyaclass.jpeg" alt="Sattriya" />
              <h5>Sattriya</h5>
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); navigate('/IndividualClass/Sattriya')}}>view classes</button>
            </div>
          </div>

  

        <div className="modal fade" id="addClassesModal" tabIndex="-1" role="dialog" aria-labelledby="addClassesModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addClassesModalLabel">Add Dance Class</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: 'white' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form method="post" action="#" id="addClassForm" encType='multipart/form-data'>
                  <div className="form-group">
                    <label htmlFor="danceFormName">Dance Form Name</label>
                    <select name="danceFormName" style={{color: "white"}} className="form-control bg-dark" id="danceFormName" onChange={handleInputchange} defaultValue={""}>
                      <option value="">Select</option>
                      <option value="Bharatnatyam">Bharatnatyam</option>
                      <option value="Kathak">Kathak</option>
                      <option value="Odissi">Odissi</option>
                      <option value="Kuchipudi">Kuchipudi</option>
                      <option value="Manipuri">Manipuri</option>
                      <option value="Bhangra">Bhangra</option>
                      <option value="KeralaNatanam">Kerala Natanam</option>
                      <option value="Sattriya">Sattriya</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="danceClassName">Dance Class Name</label>
                    <input style={{color: "white"}} type="text" name='className' required={true} onChange={handleInputchange} value={values.className} className="form-control bg-dark" id="danceClassName" placeholder="Enter dance class name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="teacherName">Teacher Name</label>
                    <input style={{color: "white"}} type="text" name="teacherName" required={true} onChange={handleInputchange} value={values.teacherName} className="form-control bg-dark" id="teacherName" placeholder="Enter dance tutor name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="danceclassLink">Dance Class Link</label>
                    <input style={{color: "white"}} type="url" name="classLink" onChange={handleInputchange} value={values.classLink} className="form-control bg-dark" id="danceclassLink" placeholder="Enter class link" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="thumbnail">Add Thumbnail</label>
                    <input style={{color: "white"}} type="file" name="files" onChange={handleFilepload} className="form-control-file" id="thumbnail" />
                  </div>
                  <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-dismiss="modal"  >Cancel</button>
                <button type="button" onClick={submitForm} className="btn btn-dark" style={{ backgroundColor: 'rgba(0, 0, 20, 0.2)', color: 'white', borderColor: 'white' }}>Submit</button>
              </div>
                  </form>
              </div>              
            </div>
          </div>
        </div>



        <Footer />

      </div>
    </div>

  )
}

export default Classes
