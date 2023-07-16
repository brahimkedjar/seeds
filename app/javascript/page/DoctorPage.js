import NavBarDoc from "../components_help/NavBarDoc";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import PatientList from '../page/PatientList';
import Appointments from '../page/Appointments';
import Docmod from '../page/Docmod';
import DoctorAccount from '../page/DoctorAccount';
import MapComponent from "./mapdoctor";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  DoctorPage:{
  backgroundcolor:'grey',
  backgroundrepeat: 'no-repeat',
  backgroundsize: 'contain',
  backgroundposition: 'center center',
  minheight: '100vh',
  }
}))
function DoctorPage() {
  const classes = useStyles();

  const [doctorData, setDoctorData] = useState(null);
  useEffect(() => {
    // Fetch the user data from the API
    fetch('/api/v1/doctor_data')
      .then(response => response.json())
      .then(data => setDoctorData(data))
      .catch(error => console.error(error));
  }, []);
  if (!doctorData) {
    // Render a loading indicator while the data is being fetched
    return <div>Loading...</div>;
  }
    return (
      <div className={classes.DoctorPage}>
        <NavBarDoc />
        <Routes>
            <Route path='' element={<DoctorAccount doctorData={doctorData}/>}/>
            <Route path='Account' element={<DoctorAccount doctorData={doctorData}/>}/>
            <Route path='Account/:id' element={<Docmod/>}/>
            <Route path='Map' element={<MapComponent/>}/>
            <Route path='PatientList' element={<PatientList doctorData={doctorData}/>}/>
            <Route path='Appointments' element={<Appointments/>}/>
      </Routes>
      </div>
    );
  }

  export default DoctorPage;
