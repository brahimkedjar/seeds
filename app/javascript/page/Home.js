import '../css/Home.css';
import React from 'react';
import { createRoot } from "react-dom/client";
import doctorImage from '../img/p8.png';
import patientImage from '../img/p1.png';
function Home() {


  return (

    <div className="Home">
    <div className="landing10">
      <div className="intro-text10">
        <h1>Bienvenue chez SIHATI</h1>
        <p>Inscrivez-vous sur l'application, demandez un medecin où que vous soyez et avoir des soins de santé de bonne qualité.</p>
      </div>
    </div>

      <div className="cards-container10">
        <div className="card10">
          <img src={doctorImage} alt="Doctor" />
          <div className="card-buttons10">
            <button className="connexion-btn10">Connexion</button>
            <button className="inscription-btn10">Inscription</button>
          </div>
        </div>

        <div className="card10">
          <img src={patientImage} alt="Patient" />
          <div className="card-buttons10">
            <button className="connexion-btn10">Connexion</button>
            <button className="inscription-btn10">Inscription</button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="title">Prestations de service</h2>
        <div className="content">
            <div className="cardhome">
                <div className="iconhome">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div className="info">
                    <h3>Trouver un médecin</h3>
                    <p> Vous pouvez rechercher le médecin dont vous avez besoin dans votre région ou dans toute autre région</p>
                </div>
            </div>
            <div className="cardhome">
                <div className="iconhome">
                <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div className="info">
                    <h3> prise de rendez-vous</h3>
                    <p>Vous pouvez prendre rendez-vous avec le médecin</p>
                </div>
            </div>
            <div className="cardhome">
                <div className="iconhome">
                 <i className="fa-solid fa-truck-medical"></i>
                </div>
                <div className="info">
                    <h3> médecins de transfert</h3>
                    <p> Les médecins disponibles dans votre région seront informés de votre demande et pourront y venir à le plus proche centre de santé .</p>
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

export default Home;
document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("home");
  app && createRoot(app).render(<Home />);
  });




