import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVedio from '../assests/back.mp4';
import logo from '../assests/logo.png';
import missionImg from '../assests/crdit.jpg'; // Placeholder for Mission image
import visionImg from '../assests/crdit.jpg';   // Placeholder for Vision image
import feedbackImg from '../assests/crdit.jpg'; // Placeholder for Feedback image
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // <--- UNCOMMENTED THIS LINE

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem('studentEmail', email);

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);

        switch (data.role) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'tutor':
            navigate('/tutor-dashboard');
            break;
          case 'parent':
            navigate('/parent-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            alert('Unknown role');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to a backend server
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    // The main container now ensures it fills the viewport and allows overall scrolling
    <div className="position-relative w-100 min-vh-100 overflow-hidden" style={{ minHeight: '100vh' }}>
      <video
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ zIndex: 0 }}
      >
        <source src={backgroundVedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
          zIndex: 1,
        }}
      />

      {/* Main content wrapper - removed overflowY: 'auto' here */}
      <div
        className="d-flex flex-column align-items-center w-100"
        style={{
          zIndex: 2,
          position: 'relative',
          // The content should naturally expand and trigger scroll on body/html
          paddingTop: '0', // Adjust if needed
          paddingBottom: '0' // Adjust if needed
        }}
      >
        <nav
          className="navbar navbar-expand-lg w-100 p-3"
          style={{
            position: 'sticky', // This is correct for sticky behavior
            top: 0,
            zIndex: 11,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="container-fluid">
            <a className="navbar-brand me-auto" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <img src={logo} alt="Logo" style={{ width: '120px', borderRadius: '50px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }} />
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
              <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item me-3">
                  <a className="nav-link text-white fw-bold" href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); }}>Home</a>
                </li>
                <li className="nav-item me-3">
                  <a className="nav-link text-white fw-bold" href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); }}>About</a>
                </li>
                <li className="nav-item me-3">
                  <a className="nav-link text-white fw-bold" href="#feedback" onClick={(e) => { e.preventDefault(); document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' }); }}>Feedback</a>
                </li>
                <li className="nav-item me-3"> {/* Added feedback link */}
                  <a className="nav-link text-white fw-bold" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</a>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => setShowLoginForm(true)}
                    className="btn btn-warning btn-sm px-4 py-2 fw-bold"
                    style={{
                      borderRadius: '25px',
                      backgroundColor: '#FFD700',
                      borderColor: '#FFD700',
                      color: '#343a40',
                      transition: 'all 0.3s ease-in-out',
                      '--bs-btn-hover-bg': '#e6c200',
                      '--bs-btn-hover-border-color': '#e6c200'
                    }}
                  >
                    Login
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Home Section */}
        <section id="home" className="text-center text-white px-3 animate__animated animate__fadeInDown mt-5 mb-4 py-5" style={{ maxWidth: '800px', flexShrink: 0 }}>
          <h2 className="fw-bold display-5 mb-2" style={{ letterSpacing: '1px', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Welcome to <span style={{ color: '#FFD700' }}>Baithulhikma Institute</span>
          </h2>
          <p className="fst-italic lead" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”
          </p>
        </section>

        {/* Login/Get Started Section */}
        {!showLoginForm ? (
          <div className="text-center animate__animated animate__zoomIn my-5 py-5" style={{ flexShrink: 0 }}>
            <button
              onClick={() => setShowLoginForm(true)}
              className="btn btn-warning btn-lg px-5 py-3 fw-bold shadow-lg"
              style={{
                borderRadius: '50px',
                fontSize: '1.8rem',
                letterSpacing: '1px',
                backgroundColor: '#FFD700',
                borderColor: '#FFD700',
                color: '#343a40',
                transition: 'all 0.3s ease-in-out',
                '--bs-btn-hover-bg': '#e6c200',
                '--bs-btn-hover-border-color': '#e6c200'
              }}
            >
              Login to Get Started
            </button>
          </div>
        ) : (
          <div
            className="card p-5 shadow-lg animate__animated animate__fadeInUp my-5"
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              flexShrink: 0
            }}
          >
            <h4 className="text-center text-primary fw-bold mb-4" style={{ color: '#0056b3' }}>Login to Your Account</h4>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg mb-3"
              style={{ borderRadius: '8px', borderColor: '#ced4da' }}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg mb-4"
              style={{ borderRadius: '8px', borderColor: '#ced4da' }}
            />
            <button
              onClick={handleLogin}
              className="btn btn-primary btn-lg w-100 mb-3 fw-bold"
              style={{
                borderRadius: '10px',
                background: 'linear-gradient(45deg, #007bff, #0056b3)',
                borderColor: '#007bff',
                boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)'
              }}
            >
              Login
            </button>
            <p className="text-center text-muted m-0">
              Don’t have an account?{' '}
              <a href="/register" className="text-decoration-none fw-bold" style={{ color: '#007bff' }}>
                Register
              </a>
            </p>
          </div>
        )}

        ---

        {/* About Section (Mission & Vision) */}
        <section id="about" className="container text-white text-center mt-5 mb-5 px-3 animate__animated animate__fadeInUp py-5" style={{ flexShrink: 0 }}>
          <h2 className="fw-bold display-6 mb-5" style={{ color: '#FFD700', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>About Us</h2>
          <div className="row justify-content-center mb-5">
            <div
              className="col-md-8 p-4 d-flex flex-column flex-md-row align-items-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div className="me-md-4 mb-3 mb-md-0">
                <img src={missionImg} alt="Our Mission" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #FFD700' }} />
              </div>
              <div>
                <h3 className="fw-bold mb-3" style={{ color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Our Mission</h3>
                <p className="lead px-2" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Our mission at Baithulhikma Institute is to empower students with holistic knowledge and critical thinking skills, fostering a love for lifelong learning and preparing them to excel academically and contribute positively to society.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-md-8 p-4 d-flex flex-column flex-md-row align-items-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div className="me-md-4 mb-3 mb-md-0">
                <img src={visionImg} alt="Our Vision" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #FFD700' }} />
              </div>
              <div>
                <h3 className="fw-bold mb-3" style={{ color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Our Vision</h3>
                <p className="lead px-2" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  To be a leading educational institution renowned for academic excellence, innovative teaching methodologies, and for nurturing well-rounded individuals who are intellectually curious, ethically grounded, and globally aware.
                </p>
              </div>
            </div>
          </div>
        </section>

        ---

        {/* Feedback Section */}
        <section id="feedback" className="container text-white text-center mt-5 mb-5 px-3 animate__animated animate__fadeInUp py-5" style={{ flexShrink: 0 }}>
          <h2 className="fw-bold display-6 mb-5" style={{ color: '#FFD700', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Share Your Feedback</h2>
          <div
            className="row justify-content-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '20px',
            }}
          >
            <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
              <img src={feedbackImg} alt="Feedback" className="img-fluid rounded-circle" style={{ width: '200px', height: '200px', objectFit: 'cover', border: '3px solid #FFD700' }} />
            </div>
            <div className="col-md-6">
              <p className="lead mb-4" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                We value your opinion! Please let us know your thoughts and suggestions.
              </p>
              <form onSubmit={handleFeedbackSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Type your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{ borderRadius: '8px', borderColor: '#ced4da', backgroundColor: 'rgba(255,255,255,0.8)' }}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-warning btn-lg fw-bold"
                  style={{
                    borderRadius: '10px',
                    backgroundColor: '#FFD700',
                    borderColor: '#FFD700',
                    color: '#343a40',
                    transition: 'all 0.3s ease-in-out',
                    '--bs-btn-hover-bg': '#e6c200',
                    '--bs-btn-hover-border-color': '#e6c200'
                  }}
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </section>

        ---

        {/* Contact Us Section */}
        <section id="contact" className="container text-white text-center mt-5 mb-5 px-3 animate__animated animate__fadeInUp py-5" style={{ flexShrink: 0 }}>
          <h2 className="fw-bold display-6 mb-5" style={{ color: '#FFD700', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Contact Us</h2>
          <div
            className="row justify-content-center p-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <div className="col-md-8">
              <p className="lead px-2" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Have questions or need assistance? Reach out to us through the following channels:
              </p>
              <ul className="list-unstyled text-start mx-auto" style={{ maxWidth: '400px', fontSize: '1.1rem' }}>
                <li className="mb-3">
                  <i className="fas fa-map-marker-alt me-2 text-warning"></i>
                  **Address:** 123 Main Street, Wattala, Western Province, Sri Lanka.
                </li>
                <li className="mb-3">
                  <i className="fas fa-envelope me-2 text-warning"></i>
                  **Email:** <a href="mailto:info@baithulhikma.lk" className="text-warning text-decoration-none">info@baithulhikma.lk</a>
                </li>
                <li className="mb-3">
                  <i className="fas fa-phone me-2 text-warning"></i>
                  **Phone:** +94 11 123 4567
                </li>
                <li>
                  <i className="fas fa-clock me-2 text-warning"></i>
                  **Hours:** Monday - Friday, 9:00 AM - 5:00 PM
                </li>
              </ul>
              <div className="mt-4">
                <h4 className="text-warning mb-3">Connect with us:</h4>
                <a href="#" className="text-white mx-3 fs-3" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white mx-3 fs-3" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white mx-3 fs-3" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </section>

        <footer
          className="w-100 py-4 text-center text-white mt-auto"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            paddingLeft: '15px',
            paddingRight: '15px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            zIndex: 50,
          }}
        >
          <p className="mb-1 fw-bold">&copy; {new Date().getFullYear()} Baithulhikma Institute. All rights reserved.</p>
          <p className="mb-1">
            **Address:** 123 Main Street, Wattala, Western Province, Sri Lanka.
          </p>
          <p className="mb-1">Contact: <a href="mailto:info@baithulhikma.lk" className="text-warning text-decoration-none">info@baithulhikma.lk</a></p>
          <p className="mb-0">Connect with us:
            <span className="mx-2"><i className="fab fa-facebook-f"></i></span>
            <span className="mx-2"><i className="fab fa-instagram"></i></span>
            <span className="mx-2"><i className="fab fa-linkedin-in"></i></span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;