import { useEffect, useState } from "react";
import React from 'react';
import '../css/FindDoctor.css';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box } from '@mui/material';

function FindDoctor(props) {
  const { userData } = props;

  // Initialize state for selected options
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // Initialize state for API response
  const [itemsData, setItemsData] = useState([]);

  // Define function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("//sihati.univ-setif.dz/assign_group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patient_id: userData.patient_data.id,
        latitude:userData.patient_data.latitude ,
        longitude: userData.patient_data.longitude,
        baladia: selectedCommune,
        speciality: selectedSpecialty
      })
    })
    .then((res) => res.json())
    .then((data) => {
      setItemsData(data);
      window.location.reload();
    });
  }

  // Fetch data from API on component mount and whenever selectedCommune or selectedSpecialty change
  useEffect(() => {
    fetch(`/get_patients/${userData.patient_data.id}`)
      .then((res) => res.json())
      .then((data) => setItemsData(data));
  }, []);
 return (
    <div className="FindDoctor">
      <div className="annons">
        <div className="ans">Annoncer votre besoin d'un medecin.</div>
        <form onSubmit={handleSubmit} className="form1">
          <div className="selectcontainer">
            <label htmlFor="commune">Choisissez votre commune</label>
            <select
              name="commune"
              id="commune"
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
            >
              <option value="">-- Sélectionnez une commune --</option>
              <option value="Aïn Abessa"> Aïn Abessa </option>
                <option value="Aïn Arnat"> Aïn Arnat</option>
                <option value="Aïn Azel"> Aïn Azel</option>
                <option value="Aïn El Kebira"> Aïn El Kebira</option>
                <option value="Aïn Lahdjar"> Aïn Lahdjar</option>
                <option value="Aïn Legradj"> Aïn Legradj</option>
                <option value="Aïn Oulmene"> Aïn Oulmene</option>
                <option value="Aïn Roua"> Aïn Roua</option>
                <option value="Aïn Sebt"> Aïn Sebt</option>
                <option value="Aït Naoual Mezada"> Aït Naoual Mezada</option>
                <option value="Aït Tizi"> Aït Tizi</option>
                <option value="Beni Ouartilene"> Beni Ouartilene</option>
                <option value="Amoucha"> Amoucha</option>
                <option value="Babor"> Babor</option>
                <option value="Bazer Sakhra"> Bazer Sakhra</option>
                <option value="Beidha Bordj"> Beidha Bordj</option>
                <option value="Belaa"> Belaa</option>
                <option value="Beni Aziz"> Beni Aziz</option>
                <option value="Beni Chebana"> Beni Chebana</option>
                <option value="Beni Fouda"> Beni Fouda</option>
                <option value="Beni Hocine"> Beni Hocine</option>
                <option value="Beni Mouhli"> Beni Mouhli</option>
                <option value="Bir El Arch"> Bir El Arch</option>
                <option value="Bir Haddada"> Bir Haddada</option>
                <option value="Bouandas"> Bouandas</option>
                <option value="Bougaa"> Bougaa</option>
                <option value="Bousselam"> Bousselam</option>
                <option value="Boutaleb"> Boutaleb</option>
                <option value="Dehamcha"> Dehamcha</option>
                <option value="Djemila"> Djemila</option>
                <option value="Draa Kebila"> Draa Kebila</option>
                <option value="El Eulma"> El Eulma</option>
                <option value="El Ouldja"> El Ouldja</option>
                <option value="El Ouricia"> El Ouricia</option>
                <option value="Guellal"> Guellal</option>
                <option value="Guelta Zerka"> Guelta Zerka</option>
                <option value="Guenzet"> Guenzet</option>
                <option value="Guidjel"> Guidjel</option>
                <option value="Hamma"> Hamma</option>
                <option value="Hammam Guergour"> Hammam Guergour</option>
                <option value="Hammam Soukhna"> Hammam Soukhna</option>
                <option value="Harbil"> Harbil</option>
                <option value="Ksar El Abtal"> Ksar El Abtal</option>
                <option value="Maaouia"> Maaouia</option>
                <option value="Maoklane"> Maoklane</option>
                <option value="Mezloug"> Mezloug</option>
                <option value="Oued El Barad"> Oued El Barad</option>
                <option value="Ouled Addouane"> Ouled Addouane</option>
                <option value="Ouled Sabor"> Ouled Sabor</option>
                <option value="Ouled Si Ahmed"> Ouled Si Ahmed</option>
                <option value="Ouled Tebben"> Ouled Tebben</option>
                <option value="Rasfa"> Rasfa</option>
                <option value="Salah Bey"> Salah Bey</option>
                <option value="Serdj El Ghoul"> Serdj El Ghoul</option>
                <option value="Sétif"> Sétif</option>
                <option value="Tachouda"> Tachouda</option>
                <option value="Talaifacene"> Talaifacene</option>
                <option value="Taya"> Taya</option>
                <option value="Tella"> Tella</option>
                <option value="Tizi N'Bechar"> Tizi N'Bechar</option>
            </select>
          </div>
          <div className="selectcontainer">
            <label htmlFor="specialty">Choisissez une spécialité</label>
            <select
              name="specialty"
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">-- Sélectionnez une spécialité --</option>
              <option value="Cardiologue">Cardiologue</option>
                <option value="Dentiste">Dentiste </option>
                <option value="Gastrologue">Gastrologue</option>
                <option value="Généraliste">Généraliste</option>
                <option value="Gynécologue ">Gynécologue </option>
                <option value="Hématologue">Hématologue</option>
                <option value="Néphrologue">Néphrologue</option>
                <option value="Neurologues">Neurologue</option>
                <option value="Orl">Orl</option>
                <option value="Orthopédiste">Orthopédiste</option>
                <option value="Ophtalmologue ">Ophtalmologue </option>
                <option value="Pédiatre">Pédiatre</option>
            </select>
          </div>
          <input className="submit1" type="submit" value="Soummetre" />
        </form>
      </div>
      <div className="titlefn">Mes Annonces</div>
      <div className="appoint">
  {itemsData.length >= 1 ? (
    <TableContainer component={Box} sx={{ borderRadius: '20px', backgroundColor: 'white', boxShadow: '0px -1px 15px 0px rgba(0,0,0,0.08)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Spécialités
            </TableCell>
            <TableCell>
              Commune
            </TableCell>
            <TableCell></TableCell> {/* Empty cell for the delete button */}
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item.speciality}
              </TableCell>
              <TableCell>
                {item.baladia}
              </TableCell>
              <TableCell>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  Supprimer
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="noappo">Aucun rendez-vous trouvé</div>
  )}
</div>

    </div>
  );
};

export default FindDoctor;
