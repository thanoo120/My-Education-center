import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaBook,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import ClassSchedule from "../components/ClassScheduleCard";
import AttendanceStatus from "../components/AttendanceTracker";
import FeeStatus from "../components/FeeStatus";
import ExamResults from "../components/PerformanceInsights";
import LogoutButton from "../components/LogoutButton";
import studentImage from "../assests/student.jpg";
import Subjects from "../components/SubjectCart";
import TeacherImage from "../assests/teacher.jpg";
import ClassLogo from "../assests/Classlogo.jpg";
import Profile from "../components/ProfileSection"
const StudentDashboard = () => {
  const [section, setSection] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const loginEmail = localStorage.getItem("studentEmail");

  useEffect(() => {
    if (!loginEmail) {
      console.error("No email found - redirect to login");
      return;
    }

    fetch("/api/students/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail }),
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, [loginEmail]);

  const renderSection = () => {
    switch (section) {
      case "classes":
        return <ClassSchedule email={loginEmail} />;
      case "attendance":
        return <AttendanceStatus />;
      case "payments":
        return <FeeStatus studentEmail={loginEmail} />;
      case "results":
        return <ExamResults />;
      case "profile":
        return <Profile />;
        case "subjects":
          return <Subjects/>;
          case "logout":
            return <LogoutButton/>;
      default:
        return (
          <div className="bg-white p-5 rounded shadow-sm animate__animated animate__fadeIn">
            <div className="d-flex flex-column flex-md-row align-items-center mb-4">
              <img
                src={studentImage}
                alt="Welcome"
                className="img-fluid mb-4 mb-md-0"
                style={{ maxWidth: "450px", marginRight: "50px" }}
              />
              <div>
                <h2
                  className="text-primary mb-3"
                  style={{ fontSize: "2.2rem" }}
                >
                  Hi, {profile?.name || "Student"} 👋
                </h2>
                <p
                  className="text-secondary mb-3"
                  style={{ fontSize: "1.90rem" }}
                >
                  "Welcome to <strong>Easy Learn Accadamy</strong>.We are the leading online education provider now in the Educational Field.
                    We are providing Quality Education toStudents.Here You are able find your best teachers related your mindset.We 10 year of erperince in this field.
                    This is your Student Page You can choose you teacher,check your marks and check your marks and attendence and you can edit your profiles also.
                    If you have question you can send a message throug this plattform to your teachers.You can pay your class payments also here.<strong>This the best platform for your better future</strong>".
                  
                </p>
               
              </div>
            </div>
            <div className="container my-5">
              <div className="card shadow-lg border-0 rounded-4 bg-light">
                <div className="card-body p-5 text-center">
                  
                 <div className="d-flex flex-column flex-md-row align-items-center mb-4">
              <img
                src={TeacherImage}
                alt="Welcome"
                className="img-fluid mb-4 mb-md-0"
                style={{ maxWidth: "450px", marginRight: "50px" }}
              />
              </div> 

                  <h2 className="text-primary fw-bold mb-4">
                    
                    👋 Welcome to Our Learning Community!
                  </h2>
                  <p className="text-secondary fs-5 mb-4">
                    We are dedicated to providing quality education that
                    empowers students for a brighter future. With a team of
                    well-experienced and passionate teachers, we ensure that
                    every student receives the attention and guidance they
                    deserve.
                  </p>
                  <p className="text-muted fs-5 mb-4">
                    You can trust us to help you grow, learn, and succeed in a
                    supportive and inspiring environment. Join us and take the
                    first step towards excellence!
                  </p>
                  <button
                    className="btn btn-success btn-lg px-5 py-2 fw-bold shadow-sm"
                    onClick={() => setSection("subjects")}
                  >
                    🎓 Enroll for a Course
                  </button>
                </div>
              </div>
            </div>
       
          </div>
        );
    }
  };

  const navButtons = [
    { label: "Dashboard", icon: <FaHome />, key: "dashboard" },
    { label: "My Classes", icon: <FaBook />, key: "classes" },
    { label: "My Attendance", icon: <FaCalendarCheck />, key: "attendance" },
    { label: "My Payments", icon: <FaMoneyCheckAlt />, key: "payments" },
    { label: "Exam Results", icon: <FaChartBar />, key: "results" },
    { label: "profile", icon: <FaSignOutAlt />, key: "profile" },
  ];

  return (
    <div className="d-flex min-vh-100" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>

  <aside
    className="text-white p-4 shadow-lg"
    style={{
      width: "280px",
      background: "linear-gradient(195deg, rgba(66, 66, 74, 0.9), rgba(25, 25, 25, 0.9))",
      backdropFilter: "blur(12px)",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease"
    }}
  >
    <div className="d-flex flex-column h-100">
   
      <div className="text-center mb-5 pt-3">
        <div className="h3 mb-1 fw-bold text-light d-flex align-items-center justify-content-center">
          <span className="me-2"><image src={ClassLogo}></image></span>
          <span style={{ 
            background: "linear-gradient(90deg, #fff, #a7c7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Student Portal
          </span>
        </div>
      </div>

      
      <nav className="flex-grow-1">
        {navButtons.map(({ label, icon, key }) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={`btn d-flex align-items-center w-100 mb-2 p-3 rounded-pill sidebar-btn ${
              section === key ? "active-button" : "inactive-button"
            }`}
            style={{
              transition: "all 0.3s ease",
              border: section === key ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
              background: section === key 
                ? "linear-gradient(90deg, rgba(101, 115, 255, 0.8), rgba(101, 163, 255, 0.8))" 
                : "transparent",
              color: section === key ? "white" : "rgba(255, 255, 255, 0.7)",
              boxShadow: section === key ? "0 4px 10px rgba(101, 115, 255, 0.3)" : "none"
            }}
          >
            <span className="me-3 fs-5" style={{ width: "24px", textAlign: "center" }}>{icon}</span>
            <span className="fw-medium">{label}</span>
            {section === key && (
              <span className="ms-auto">
                <i className="bi bi-chevron-right"></i>
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
        <button className="btn btn-outline-light rounded-pill w-100 d-flex align-items-center justify-content-center py-2" onClick={()=>{setSection("logout")}}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Log Out 
        </button>
      </div>
    </div>
  </aside>
  <main 
    className="flex-fill p-4 animate__animated animate__fadeIn"
    style={{
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "20px 0 0 20px",
      margin: "20px 20px 20px 0",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
      backdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    }}
  >
    {renderSection()}
  </main>
</div>
  );
}

export default StudentDashboard;
