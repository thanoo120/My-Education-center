import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assests/background1.jpg';
import backgroundVedio from '../assests/back.mp4';
import logo from '../assests/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
// If you want to use social media icons (like Font Awesome),
// ensure you have it installed or linked in your public/index.html:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control form visibility
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

  return (
    // Outer container: holds background video/overlay and the main scrollable content
    <div className="position-relative w-100 h-100 overflow-hidden">
      {/* Background Video */}
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
      
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ 
        }}
      />

      {/* MAIN SCROLLABLE CONTENT AREA */}
      {/* This div contains all the visible page content and handles scrolling */}
      <div 
        className="d-flex flex-column align-items-center w-100 min-vh-100 py-4" 
        style={{ 
          zIndex: 2, 
          overflowY: 'auto' 
        }}
      >
        {/* Navbar */}
        <nav 
          className="navbar navbar-expand-lg w-100 p-3" 
          style={{ 
            position: 'sticky', // Makes it sticky at the top during scroll
            top: 0, 
            zIndex: 11, // Higher z-index than logo's sticky background
            backdropFilter: 'blur(5px)', // Subtle blur effect
            WebkitBackdropFilter: 'blur(5px)',
          }}
        >
          <div className="container-fluid">
            {/* Logo in Navbar - Adjusted positioning from original */}
            <a className="navbar-brand me-auto" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <img src={logo} alt="Logo" style={{ width: '120px', borderRadius: '50px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }} />
            </a>
            
            {/* Toggler for mobile */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
              <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span> {/* Invert for visibility on dark background */}
            </button>

            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto"> {/* ms-auto pushes links to the right */}
                <li className="nav-item me-3">
                  <a className="nav-link text-white fw-bold active" aria-current="page" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                </li>
                <li className="nav-item me-3">
                  <a className="nav-link text-white fw-bold" href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Welcome Text */}
        <div
          className="text-center text-white px-3 animate__animated animate__fadeInDown mt-5 mb-4"
          style={{ maxWidth: '800px' }}
        >
          <h2 className="fw-bold display-5 mb-2" style={{ letterSpacing: '1px', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Welcome to <span style={{ color: '#FFD700' }}>Baithulhikma Institute</span>
          </h2>
          <p className="fst-italic lead" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”
          </p>
        </div>

        
        {!showLoginForm ? (
          
          <div className="text-center animate__animated animate__zoomIn my-5">
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
              WebkitBackdropFilter: 'blur(5px)'
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

        {/* Mission and Vision Sections (visible only when login form is NOT shown) */}
        {!showLoginForm && (
          <div className="container text-white text-center mt-5 mb-5 px-3 animate__animated animate__fadeInUp">
            <div className="row justify-content-center mb-5">
              <div 
                className="col-md-8 p-4" 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.2)' 
                }}
              >
                <h3 className="fw-bold mb-3" style={{ color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Our Mission</h3>
                <p className="lead px-2" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Our mission at Baithulhikma Institute is to empower students with holistic knowledge and critical thinking skills, fostering a love for lifelong learning and preparing them to excel academically and contribute positively to society.
                </p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div 
                className="col-md-8 p-4" 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <h3 className="fw-bold mb-3" style={{ color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Our Vision</h3>
                <p className="lead px-2" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  To be a leading educational institution renowned for academic excellence, innovative teaching methodologies, and for nurturing well-rounded individuals who are intellectually curious, ethically grounded, and globally aware.
                </p>
              </div>
            </div>
          </div>
        )}

      
        <footer 
          className="w-100 py-4 text-center text-white mt-auto " 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // Slightly more opaque background
            paddingLeft: '15px', 
            paddingRight: '15px', 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            zIndex:50,
            marginBottom:'30px'
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