import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/homestyles.css";
import Footer from '../components/Footer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

function Home() {


  const navigate = useNavigate();

  const logout = async()=>{
    await api.post('/logout')
    sessionStorage.clear();
    toast.success("Logged Out!", {onClose: ()=>(window.location.reload())});
  }

  const getRecs = async () => {
    try{
      const data = await api.post('/getRecs',{}, {withCredentials: true})
      setRecs(data.data);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const[isloggedin, setLoggedin] = useState(false);
  const[recs, setRecs] = useState(null);
  useEffect(() => {
    document.title = 'HomePage';
    setLoggedin((sessionStorage.getItem('user') !== null)?true:false);
    if(sessionStorage.getItem('user')!==null)
    {
      
      getRecs();
    }
  }, []);

  useEffect(() => {
    const myCarousel = document.querySelector('#carouselExampleAutoplaying');
    const carousel = new bootstrap.Carousel(myCarousel, {
      interval: 3000,
      pause: false
    });
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
                  <Link className="nav-link" to="/" style={{ color: 'orange' }}>
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

        <section>
        {console.log(recs)}
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            style={{ height: '400px' }}
          >
            <div className="carousel-inner" style={{ maxWidth: '1200px' }}>
              <div className="carousel-item active">
                <img src="../../images/slide3.jpg" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'fill' }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="../../images/slide1.jpeg" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'fill' }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="../../images/slide4.jpg" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'fill' }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="../../images/slide2.jpg" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'fill' }} alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" style={{ width: '30px', marginLeft: '30px' }}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" style={{ width: '30px', marginRight: '90px' }}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <section>
          <div className="container shadow-none col-xxl-8 px-1 py-5" style={{ backgroundColor: '#0e0e0e' }}>
            <div className="row justify-content-center align-items-center flex-lg-row-reverse g-5 py-5">
              <div className="col-8 col-sm-6 col-lg-4"> {/* Adjusted column size */}
                <img src="../../images/aboutimg.jpg" className="d-block mx-lg-auto img-fluid" alt="abtimg" width="400" height="200" loading="lazy" /> {/* Adjusted width and height */}
              </div>
              <div className="col-lg-8">
                <h1 style={{ textAlign: 'center' }}>About</h1>
                <p className="text-lg">
                  "Welcome to our online dance collaboration platform, where passion meets opportunity. Dive into a world of endless possibilities as we unite dancers from all corners of the globe. Our platform serves as a hub for enthusiasts and professionals alike, offering a rich tapestry of classes, institutes, auditions, events, and workshops. Whether you're a seasoned dancer looking to refine your skills or a newcomer eager to explore the world of dance, our platform provides the tools and resources you need to thrive. "
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Add more sections */}
        {recs !=null && (<section>
          
          <h2>Already watched</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          {recs.visited.map((data, idx)=>(
              <div key={idx} style={{ width: '80%', maxWidth: '1000px', display: 'flex', border: '1px solid #686868', backgroundColor: '#282828', color: 'white', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 0 5px rgba(180, 180, 180, 0.1)', transition: 'box-shadow 0.3s', cursor: 'pointer' }}>
                <div style={{ padding: '10px' }}>
                  <h3 style={{ margin: '0' , color: "white"}}> {data}</h3>
                  <button style={{ marginTop: '15px', color: '#bfbfbf' }} onClick={()=>{navigate(`/IndividualClass/${data}`)}}>visit</button>
                </div>
              </div>
            ))}
      
      </div>
          <h2>Recommendations</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          {recs.recommended.map((data, idx)=>(
              <div key={idx} style={{ width: '80%', maxWidth: '1000px', display: 'flex', border: '1px solid #686868', backgroundColor: '#282828', color: 'white', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 0 5px rgba(180, 180, 180, 0.1)', transition: 'box-shadow 0.3s', cursor: 'pointer' }}>
                <div style={{ padding: '10px' }}>
                  <h3 style={{ margin: '0' }}>{data}</h3>
                  <button style={{ marginTop: '15px', color: '#bfbfbf' }} onClick={()=>{navigate(`/IndividualClass/${data}`)}}>visit</button>
                </div>
              </div>
            ))}
      
      </div>
        </section>)
        }
                  

        <section>
          <h1>Featured Dances</h1>
          <p style={{ textAlign: 'center', fontSize: '20px', color: 'rgb(205, 205, 205)', margin: '0px 80px 30px 80px' }}>Learn more about various dance forms. Here are some of featured dance forms</p>
          <div className="featured-dance" style={{ color: 'white', margin: 'auto 80px' }}>
            <div className="dance-card">
              <Link to="/Bharatanatyam" style={{ textDecoration: 'none' }}>
                <img src="../../images/bharatanatyam.jpg" alt="Bharatanatyam" />
                <h5>Bharatanatyam</h5>
                <p>An ancient classical dance form originating from Ta</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/Kathak" style={{ textDecoration: 'none' }}>
                <img src="../../images/kathak.jpg" alt="Kathak" />
                <h5>Kathak</h5>
                <p>A classical dance form characterized by intricate footwork and graceful movements.</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/Odissi" style={{ textDecoration: 'none' }}>
                <img src="../../images/odissi.jpeg" alt="Odissi" />
                <h5>Odissi</h5>
                <p>One of the oldest classical dance forms of India, originating from Odisha.</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/Kuchipudi" style={{ textDecoration: 'none' }}>
                <img src="../../images/kuchipudi.jpeg" alt="Kuchipudi" />
                <h5>Kuchipudi</h5>
                <p>A dance-drama performance art form that originated in the Indian state of Andhra Pradesh.</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/Manipuri" style={{ textDecoration: 'none' }}>
                <img src="../../images/Manipuri.jpg" alt="Manipuri" />
                <h5>Manipuri</h5>
                <p>A classical dance form from Manipur known for its vibrant costumes and slow, graceful movements.</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/Bhangra" style={{ textDecoration: 'none' }}>
                <img src="../../images/bhangra.jpeg" alt="Bhangra" />
                <h5>Bhangra</h5>
                <p>A lively and energetic folk dance from Punjab, traditionally performed during the harvest festival.</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/KeralaNatanam" style={{ textDecoration: 'none' }} >
                <img src="../../images/kerala.jpg" alt="Kerala Natanam" />
                <h5>Kerala Natanam</h5>
                <p>A dance form that originated in Kerala, combining elements of classical and folk traditions.</p>
              </Link>
            </div>

            <div className="dance-card">
              <Link to="/Sattriya" style={{ textDecoration: 'none' }}>
                <img src="../../images/sattriya.jpeg" alt="Sattriya" />
                <h5>Sattriya</h5>
                <p>Originating from Assam, Sattriya is one of the eight classical dance forms of India.</p>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h1>Dance Classes</h1>
          <p style={{ textAlign: 'center', fontSize: '20px', color: 'rgb(205, 205, 205)', margin: '10px 80px' }}>Experience our latest class editions featuring mesmerizing dance compositions and standalone performances that beautifully represent the rich Indian art and culture. Join Us Now.</p>

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
        </section>

        <section id="latest-videos" className="latest-videos-section" style={{ paddingTop: '50px' }}>
          <h1>Latest Dance Videos</h1>
          <div className="latest-videos">
            <a href="https://www.youtube.com/watch?v=xi1K3-Kwn-E" className="video-card" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
              <img src="../../images/video1.png" alt="Dance Video 1" />
              <p>Bharathanatyam Dance Performance</p>
            </a>

            <a href="https://www.youtube.com/watch?v=JWhA3ldZcyY" className="video-card" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
              <img src="../../images/video2.png" alt="Dance Video 2" />
              <p>Shiva Shambo Bharathanatyam dance</p>
            </a>

            <a href="https://www.youtube.com/watch?v=iuAdQyWUdyA" className="video-card" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
              <img src="../../images/video3.png" alt="Dance Video 3" />
              <p>Amaiza-Indian Classical Dance </p>
            </a>
          </div>
        </section>

        <section className="testimonial-section">
          <h1>What Our Users Say</h1>
          <div className="testimonial">
            <a style={{ textDecoration: 'none', color: 'white' }} href="user1_social_media_link_here" target="_blank">
              <h5>Amazing Platform!</h5>
              <p>"I've learned so much about Indian dance forms on this platform. The tutorials are excellent, and the community is supportive!"</p>
              <p>- pooja, Dancer</p>
            </a>
          </div>
          <div className="testimonial">
            <a style={{ textDecoration: 'none', color: 'white' }} href="user1_social_media_link_here" target="_blank">
              <h5>Inspirational!</h5>
              <p>"This platform has been a constant source of inspiration for my dance journey. Highly recommended!"</p>
              <p>- sharmila, Dance Enthusiast</p>
            </a>
          </div>
          <div className="testimonial">
            <a style={{ textDecoration: 'none', color: 'white' }} href="user1_social_media_link_here" target="_blank">
              <h5>Amazing Platform!</h5>
              <p>"I've discovered a world of rich and diverse Indian dance forms through this platform. The tutorials are top-notch, and the community is so welcoming!"</p>
              <p>- leela, Dance Enthusiast</p>
            </a>
          </div>

          {/* Add more testimonials as needed */}

        </section>

        <Footer />

      </div>
    </div>
  )
}

export default Home
