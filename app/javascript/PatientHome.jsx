import React from 'react';
import './Home.css'
import { createRoot } from 'react-dom/client';
const PatientHome = () => {
  return (
    <div className="Home">
      <div className="landing">
        <div className="intro-text">
          <h1>Welcome to SIHATI</h1>
          <p> here you will finde evrything related to the health and we will help you to find the doctor you need</p>
        </div>
      </div>

      <section>
        <h2 className="title">Services</h2>
        <div className="content">
            <div className="cardhome">
                <div className="iconhome">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div className="info">
                    <h3>Find a doctor</h3>
                    <p> You can a search for the doctor you need in your area or in any other area</p>
                </div>
            </div>
            <div className="cardhome">
                <div className="iconhome">
                <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div className="info">
                    <h3> appointment booking</h3>
                    <p> You can a book an appointment with the doctor </p>
                </div>
            </div>
            <div className="cardhome">
                <div className="iconhome">
                 <i className="fa-solid fa-truck-medical"></i>
                </div>
                <div className="info">
                    <h3> transfer doctors </h3>
                    <p> doctors move to remote areas to hlep patients</p>
                </div>
            </div>
        </div>
    </section>

    <footer className="footer">
        <p className="footer-title">Copyrights @ <span> SIHATI </span></p>
        <div className="social-icons">
            <a href="/"><i className="fab fa-linkedin"></i></a>
            <a href="/"><i className="fab fa-twitter"></i></a>
            <a href="/"><i className="fab fa-instagram"></i></a>
            <a href="/"><i className="fab fa-youtube"></i></a>
        </div>
    </footer>
    </div>
  );
}
document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("patient-home-container");
  app && createRoot(app).render(<PatientHome />);
});





