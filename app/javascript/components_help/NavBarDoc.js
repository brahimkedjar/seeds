import { Link } from 'react-router-dom';
import '../css/NavBarAcount.css';
import React from 'react';

function NavBarDoc(props) {
  return (
    <div className="NavBarPat">
      <div className="navigationPat">
        <Link to="/DoctorPage/appointments">
          <span>Rendez-Vous</span>
        </Link>
        <Link to="/DoctorPage/PatientList">
          <span>Patients</span>
        </Link>
        <Link to="/DoctorPage/Account">
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default NavBarDoc;
