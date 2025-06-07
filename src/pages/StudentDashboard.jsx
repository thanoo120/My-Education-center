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
import studentImage from "../assests/add.jpg";
import Subjects from "../components/SubjectCart";
import TeacherImage from "../assests/teacher.jpg";
import ClassLogo from "../assests/Classlogo.jpg";
import Profile from "../components/ProfileSection";

const StudentDashboard = () => {
  const [section, setSection] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const loginEmail = localStorage.getItem("studentEmail");

 useEffect(() => {
  if (!loginEmail) {
    console.error("No email found - redirect to login");
    return;
  }

  fetch("http://localhost:5000/api/students/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: loginEmail }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch profile");
      }
      return res.json();
    })
    .then((data) => setProfile(data))
    .catch((err) => console.error("Profile fetch error:", err.message));
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
        return <Subjects />;
      case "logout":
        return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-5 rounded shadow-sm animate__animated animate__fadeIn">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded shadow bg-white">
              <img
                src={studentImage}
                alt="Student"
                className="img-fluid mb-4 mb-md-0"
                style={{
                  maxWidth: "500px",
                  marginRight: "40px",
                  height: "500px",
                  borderRadius: "80px",
                }}
              />
              <div>
                <h2
                  className="text-dark fw-bold mb-3"
                  style={{ fontSize: "2.5rem" }}
                >
                  Hi, {profile?.name || "Student"} 👋
                </h2>
                <p
                  className="text-secondary"
                  style={{ fontSize: "1.25rem", lineHeight: "1.8" }}
                >
                  Welcome to <strong>Easy Learn Academy</strong> – your gateway
                  to quality education online!
                  <br />
                  <br />
                  <b>"</b>🌟 We are the leading platform in online learning,
                  trusted by thousands of students over the past{" "}
                  <strong>10 years</strong>.
                  <br />
                  You can choose your preferred teacher related to your schedule.
                  This platform makes studying easy – you can check your class details,
                  attendance, and exam results. You can also pay your class fees here.
                  <strong>
                    This is the best platform for your better future!<b>"</b>
                  </strong>
                </p>
              </div>
            </div>
            <div className="container my-5">
              <div className="card shadow-lg border-0 rounded-4 bg-light">
                <div className="card-body p-5">
                  <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start fade-in-left">
                      <h2 className="text-primary fw-bold mb-4">
                        👋 Welcome to Our Learning Community!
                      </h2>
                      <p className="text-secondary fs-5 mb-3">
                        We are dedicated to providing quality education that
                        empowers students for a brighter future. With a team of
                        well-experienced and passionate teachers, we ensure that
                        every student receives the attention and guidance they
                        deserve.
                      </p>
                      <p className="text-muted fs-5 mb-4">
                        You can trust us to help you grow, learn, and succeed in
                        a supportive and inspiring environment. Join us and take
                        the first step towards excellence!
                      </p>
                      <button
                        className="btn btn-success btn-lg px-5 py-2 fw-bold shadow-sm"
                        onClick={() => setSection("subjects")}
                      >
                        🎓 Enroll for a Course
                      </button>
                    </div>
                    <div className="col-md-6 mb-4 mb-md-0 fade-in-right">
                      <img
                        src={TeacherImage}
                        alt="Welcome"
                        className="img-fluid rounded-3"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
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
    { label: "Profile", icon: <FaSignOutAlt />, key: "profile" },
  ];

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        overflowX: "hidden",
      }}
    >
     
      <aside
        className="flex-shrink-0 p-4 text-white shadow-lg"
        style={{
          width: "280px",
          background:
            "linear-gradient(195deg, rgba(66, 66, 74, 0.9), rgba(25, 25, 25, 0.9))",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="text-center mb-5 pt-3">
          <img
            src={ClassLogo}
            alt="Logo"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <div
            className="h4 fw-bold"
            style={{
              background: "linear-gradient(90deg, #fff, #a7c7ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Student Portal
          </div>
        </div>

       
        <nav className="mb-auto">
          {navButtons.map(({ label, icon, key }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`btn d-flex align-items-center w-100 mb-2 p-3 rounded-pill sidebar-btn ${
                section === key ? "active-button" : "inactive-button"
              }`}
              style={{
                transition: "all 0.3s ease",
                border:
                  section === key
                    ? "none"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                background:
                  section === key
                    ? "linear-gradient(90deg, rgba(101, 115, 255, 0.8), rgba(101, 163, 255, 0.8))"
                    : "transparent",
                color:
                  section === key ? "white" : "rgba(255, 255, 255, 0.7)",
                boxShadow:
                  section === key
                    ? "0 4px 10px rgba(101, 115, 255, 0.3)"
                    : "none",
              }}
            >
              <span
                className="me-3 fs-5"
                style={{ width: "24px", textAlign: "center" }}
              >
                {icon}
              </span>
              <span className="fw-medium">{label}</span>
              {section === key && (
                <span className="ms-auto">
                  <i className="bi bi-chevron-right"></i>
                </span>
              )}
            </button>
          ))}
        </nav>

     
        <div className="pt-3 border-top border-secondary border-opacity-25">
          <button
            className="btn btn-outline-light rounded-pill w-100 d-flex align-items-center justify-content-center py-2"
            onClick={() => setSection("logout")}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Log Out
          </button>
        </div>
      </aside>

      
      <main
        className="flex-grow-1 p-4 animate__animated animate__fadeIn"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "20px 0 0 20px",
          margin: "20px 20px 20px 0",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {renderSection()}
      </main>
    </div>
  );
};

export default StudentDashboard;
