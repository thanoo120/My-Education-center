
import React, { useState } from "react";
import axios from "axios";

const AttendanceStatus = () => {
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mockAttendanceData = {
    "student1@example.com": {
      totalClasses: 50,
      attended: 45,
      percentage: 90,
    },
    "student2@example.com": {
      totalClasses: 30,
      attended: 20,
      percentage: 67,
    },
    "student3@example.com": {
      totalClasses: 60,
      attended: 58,
      percentage: 97,
    },
    "student4@example.com": {
      totalClasses: 40,
      attended: 25,
      percentage: 62.5,
    },
  };
  // --- End Mock Data ---

  const handleFetchSummary = async (e) => {
    e.preventDefault();
    setError("");
    setSummary(null); 

    if (!email) {
      setError("Please enter a student email to check attendance.");
      return;
    }

    setLoading(true);

    try {

      await new Promise(resolve => setTimeout(resolve, 1200)); 

      
      const response = await axios.get(
        "http://localhost:5000/api/attendance/summary",
        { params: { email } }
      );
      setSummary(response.data);
   

     
      if (mockAttendanceData[email]) {
        setSummary(mockAttendanceData[email]);
      } else {
       
        setError("Attendance data not found for this email. Try 'student1@example.com' or 'student2@example.com'.");
      }

    } catch (err) {
      console.error("Attendance fetch error:", err);
      // More specific error message based on API response
      setError(err.response?.data?.message || "Failed to fetch attendance summary. Please check the email and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine attendance status message and associated Bootstrap text color class
  const getAttendanceStatus = (percentage) => {
    if (percentage === null || percentage === undefined) return { message: "", colorClass: "" };

    let message = "";
    let colorClass = "";

    if (percentage >= 90) {
      message = "Outstanding Attendance!";
      colorClass = "text-success"; // Green
    } else if (percentage >= 75) {
      message = "Good Attendance!";
      colorClass = "text-warning"; // Yellow/Orange
    } else if (percentage >= 60) {
      message = "Attendance needs attention.";
      colorClass = "text-orange"; // Custom color if defined, else use info/warning
    } else {
      message = "Critical Attendance: Please consult your advisor.";
      colorClass = "text-danger"; // Red
    }
    return { message, colorClass };
  };

  const status = summary ? getAttendanceStatus(summary.percentage) : { message: "", colorClass: "" };

  return (
    // Main container for the entire page, using Bootstrap's flex utilities for centering
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-3 bg-light-purple">
      {/* Main content card */}
      <div className="card shadow-lg p-4 p-md-5 w-100 max-w-md animate__animated animate__fadeInDown custom-card-style">

        {/* Header/Title */}
        <h2 className="text-center mb-5 display-5 fw-bold text-primary custom-header-shadow">
          <i className="fas fa-clipboard-check me-3 custom-icon-glow"></i>
          Student Attendance Tracker
        </h2>

        {/* Decorative Image/Illustration */}
        {/*
          IMPORTANT: Replace '/assets/attendance_illustration.svg' with the actual path
          to your image. Place it in your `public` folder (e.g., `public/assets/`).
          If not using a local image, you can use a placeholder or remove this.
        */}
        <img
          src="../assests/attendence.jpg" // Adjust this path if your image is elsewhere
          alt="Student checking attendance illustration"
          className="img-fluid rounded mb-5 shadow-sm mx-auto d-block custom-image-sizing"
          onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x200?text=Attendance+Tracking"; }}
        />


        {/* Email Input Form */}
        <form onSubmit={handleFetchSummary} className="mb-5">
          <div className="mb-4">
            <label htmlFor="emailInput" className="form-label fs-5 fw-semibold text-secondary">
              Enter Student Email:
            </label>
            <input
              id="emailInput"
              type="email"
              placeholder="e.g., student1@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg custom-input-style"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 fw-bold custom-button-style animate__animated animate__pulse animate__infinite-hover"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Fetching Data...
              </>
            ) : (
              <>
                <i className="fas fa-chart-pie me-2"></i> Get Attendance Report
              </>
            )}
          </button>
        </form>

        {/* Error Message Display */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center animate__animated animate__shakeX custom-alert-shadow" role="alert">
            <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
            <span className="fw-medium">{error}</span>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <p className="text-center text-info fs-5 fw-medium mt-4 animate__animated animate__pulse animate__infinite">
            <i className="fas fa-spinner fa-spin me-2"></i> Loading attendance details...
          </p>
        )}

        {/* Attendance Summary Display */}
        {summary && !loading && (
          <div className="card custom-summary-card p-4 animate__animated animate__fadeInUp">
            <h3 className="text-center mb-4 fs-4 fw-bold text-dark">
              <i className="fas fa-chart-bar me-3"></i> Your Attendance Report
            </h3>
            <ul className="list-group list-group-flush border-0">
              <li className="list-group-item d-flex justify-content-between align-items-center py-3 bg-white custom-list-item">
                <span className="fw-semibold text-muted">Total Classes:</span>
                <span className="text-primary fw-bold fs-5">{summary.totalClasses}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center py-3 bg-white custom-list-item">
                <span className="fw-semibold text-muted">Classes Attended:</span>
                <span className="text-success fw-bold fs-5">{summary.attended}</span>
              </li>
              <li className={`list-group-item d-flex justify-content-between align-items-center py-3 bg-white fw-bold custom-list-item ${status.colorClass}`}>
                <span className="text-dark">Attendance Percentage:</span>
                <span className="fs-4">{summary.percentage}%</span>
              </li>
            </ul>
            {/* Dynamic Status Message */}
            <p className={`text-center fw-bolder mt-4 mb-0 fs-3 ${status.colorClass} animate__animated animate__bounceIn animate__delay-0.5s`}>
              {status.message}
            </p>
          </div>
        )}

        {/* Initial prompt for user */}
        {!summary && !loading && !error && !email && ( // Only show this if nothing has been searched yet
          <p className="text-center text-muted mt-4 fs-5 animate__animated animate__fadeIn">
            Enter a student email above to view their attendance details.
          </p>
        )}
      </div>
    </div>
  );
};

export default AttendanceStatus;