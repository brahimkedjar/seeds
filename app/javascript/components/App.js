import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import SearchDoctors from '../page/SearchDoctors';
import Error from '../components_help/Error'
import FindDoctor from '../page/FindDoctor';
import PatientPage from '../page/patient_page';
import DoctorPage from '../page/DoctorPage';
import PatientList from '../page/PatientList';
import Appointments from '../page/Appointments';
import Docmod from '../page/Docmod';
import DoctorAccount from '../page/DoctorAccount';
import MapComponent from '../page/mapdoctor';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/PatientPage/*' element={<PatientPage/>}>
            <Route path='' element={<SearchDoctors/>}/>
            <Route path='SearchDoctors' element={<SearchDoctors/>}/>
            <Route path='FindDoctor' element={<FindDoctor/>}/>
          </Route>
          <Route path='/DoctorPage/*' element={<DoctorPage/>}>
            <Route path='' element={<DoctorAccount/>}/>
            <Route path='Account' element={<DoctorAccount/>}/>
            <Route path='Map' element={<MapComponent/>}/>
            <Route path='Account/:id' element={<Docmod/>}/>
            <Route path='PatientList' element={<PatientList/>}/>
            <Route path='Appointments' element={<Appointments/>}/>
          </Route>
          <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
