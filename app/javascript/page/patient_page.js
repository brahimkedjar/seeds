import React, { useState, useEffect } from 'react';
import NavBarPat from "../components_help/NavBarPat";
import { Routes, Route } from "react-router-dom";
import SearchDoctors from '../page/SearchDoctors';
import FindDoctor from '../page/FindDoctor';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  PatientPage:{
  backgroundcolor: 'grey',
  backgroundrepeat: 'no-repeat',
  backgroundsize: 'contain',
  minheight: '100vh',
  }
}))
function PatientPage() {
  const classes = useStyles();


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the user data from the API
    fetch('/api/v1/patient_data')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error(error));
  }, []);

  if (!userData) {
    // Render a loading indicator while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div  className={classes.PatientPage}>
      {<NavBarPat userData={userData} />}
      <Routes>
        <Route path='' element={<SearchDoctors userData={userData} />}/>
        <Route path='SearchDoctors' element={<SearchDoctors userData={userData}/>}/>
        <Route path='FindDoctor' element={<FindDoctor userData={userData} />} />
      </Routes>
    </div>
  );
}

export default PatientPage;
