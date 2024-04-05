import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../assets/styles/events.css";
import Footer from '../components/Footer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

function Events() {
  const logout = async () => {
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", { onClose: () => (window.location.reload()), autoClose: 1600 });
  }

  const [isloggedin, setLoggedin] = useState(false);
  const [id, setId] = useState("");
  const [events, setEvents] = useState([]);
  async function fetchData() {
    try {
      const resp = await api.get('/getAllEvents')
      console.log(resp);
      setEvents(resp.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    document.title = 'EventsPage';
    fetchData();
    setAdmin((sessionStorage.getItem('user') !== null) ? ((JSON.parse(sessionStorage.getItem('user')).type === 'user') ? false : true) : false);
    setLoggedin((sessionStorage.getItem('user') !== null) ? true : false)
    if (sessionStorage.getItem('user') !== null) {
      const { id } = JSON.parse(sessionStorage.getItem('user'));
      setId(id);
    }
  }, []);

  const initialValues = {
    title: "",
    date: "",
    timings: "",
    venue: ""
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
      const resText = await api.post(`/addEvent/${id}`, { userId: id, title: values.title, date: values.date, timings: values.timings, venue: values.venue })
      console.log(resText)
      const eventId = resText.data.id;
      const fd = new FormData();
      fd.append('img', file);
      const resFile = await api.post(`/uploadFile/events/${eventId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      console.log(resFile);
      toast.success("Your Event Added Successfully", {autoClose: 1600})
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
                  <Link className="nav-link" to="/Events" style={{ color: 'orange' }}>
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
          <h1>Events</h1>
          <p>{"Ignite your senses with the allure of dance and music at our vibrant events."}</p>
          <div className="col">
            {(isAdmin) && (<button type="button" className="butt float-end mb-3" style={{ marginRight: '222px' }} data-toggle="modal" data-target="#addEventModal">Add Event</button>)
            }
          </div>
        </div>
        <section>
          <div className="container">

            {(events.length === 0)?<p style={{color: "white", fontSize:"1.4rem"}}>No events Found</p>:events.map((data) => (
              <div key={data.id} className="event-card">
                <img src={`http://localhost:9000/getImage/${data.img}`} alt="Event Poster" />
                <div className="event-details">
                  <h4>{data.title}</h4>
                  <p><strong>Date:</strong>{data.date}</p>
                  <p><strong>Time:</strong> {data.timings}</p>
                  <p><strong>Venue:</strong> {data.venue}</p>
                  {/* <p><strong>Info:</strong> example@example.com</p> */}
                </div>
              </div>
            ))
            }

          </div>
        </section>

        <div className="modal fade" id="addEventModal" tabIndex="-1" role="dialog" aria-labelledby="addEventModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addEventModalLabel">Add Your Event</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: 'white' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form method="post" action="#" id="addClassForm" encType='multipart/form-data'>
                  <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input type="text" name="title" required={true} onChange={handleInputchange} value={values.title} className="form-control" id="title" placeholder="Enter Event Title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input type="date" name="date" required={true} onChange={handleInputchange} value={values.date} id="start"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="timings">Event Timings</label>
                    <input type="text" name="timings" required={true} onChange={handleInputchange} value={values.timings} className="form-control" id="timings" placeholder="Enter Event Timings" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <textarea name="venue" required={true} onChange={handleInputchange} value={values.venue} className="form-control" id="venue" rows="2" placeholder="Enter venue"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventposter">Add Poster</label>
                    <input type="file" name="files" onChange={handleFilepload} className="form-control-file" id="eventposter" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-dismiss="modal"  >Cancel</button>
                <button type="submit" onClick={submitForm} className="btn btn-dark" style={{ backgroundColor: 'rgba(0, 0, 20, 0.2)', color: 'white', borderColor: 'white' }}>Submit</button>
              </div>
            </div>
          </div>
        </div>



        <Footer />
      </div>
    </div>
  )
}

export default Events
