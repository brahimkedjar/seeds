import React, { useState ,useRef} from 'react';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Calendar from 'react-calendar';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-calendar/dist/Calendar.css';
import { Slider } from '@mui/material';
import L from 'leaflet';
import haversineDistance from 'haversine-distance'
import styles from '../css/PatientList.module.css';
import "../css/map.css";

function openGoogleMaps(latitude, longitude) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  window.open(mapsUrl, '_blank');
} window.openGoogleMaps = (latitude, longitude) => {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  window.open(mapsUrl, '_blank');
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '2%',
    marginLeft: '15%',
    marginTop: '80px',
    height: '100vh',
    position: 'relative',
  },
  form: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    maxHeight: '80vh',
    padding: theme.spacing(2),
    overflow: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.1)',
  },
  input: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#70A5D7',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#70A5D7',
      opacity: 0.8,
    },
  },
  recommendations: {
    marginBottom: '30px',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    marginTop: theme.spacing(4),
    backgroundColor: 'transparent',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.8)',
  },
  group: {
    display: 'inline-block',
    margin: theme.spacing(2),
    maxWidth: 500,
  },
  card: {
    backgroundColor: '#FFFFFF',
    display: 'inline-block',
    margin: theme.spacing(2),
    verticalAlign: 'top',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.3)',
  },
  cardHeader: {
    backgroundColor: '#70A5D7',
    color: '#fff',
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  mapid: {
    height: '400px',
    width: '100%',
  },
}));



const PatientList = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { doctorData } = props;
  const classes = useStyles();
  const [maxdistance, setMaxDistance] = useState(50);
  const [maxmembers, setMaxMembers] = useState(5);
  const [recommendations, setRecommendations] = useState([]);
  const [open, setOpen] = useState(false);
  const [groupId, setGroupeid] = React.useState(null);

  const handleOpen = (groupId) => {
    setOpen(groupId);
    setGroupeid(groupId);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function handleConfirmation() {
    try {

      const apiUrl = '/api/v1/send_notifications';
      const groupIds = Array.isArray(groupId) ? groupId : [groupId];
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'group_id': groupIds.join(','),
          'appointment_date': selectedDate ? selectedDate.toString() : '',
          'doctor_name': doctorData.doctor_data.name,
          'doctor_speciality': doctorData.doctor_data.specialite,
          'doctor_id': doctorData.doctor_data.id,
        })
      });

      if (response.status === 200) {
        console.log('Notifications sent successfully');
      } else if (response.status === 422) {
        console.log('Failed to send notifications: Unprocessable Entity');
        console.log(`Error: ${response.body}`);
      } else {
        console.log('Failed to send notifications');
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    handleClose();
  };

  const recommendationsRef = useRef(null);



  const fetchRecommendations = async () => {

    recommendationsRef.current.scrollIntoView({ behavior: "smooth" });
    const iconUrl = 'https://maps.google.com/mapfiles/ms/micons/red.png';
    const shadowUrl = 'https://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png';

    const doctorId = doctorData.doctor_data.id;
    const url = '//sihati.univ-setif.dz/recommender_patients';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      doctor_id: doctorId,
      max_distance: parseInt(maxdistance),
      max_members: parseInt(maxmembers),
    });

    try {
      const response = await axios.post(url, body, { headers });
      const responseData = response.data.recomended_groups;
      setRecommendations(responseData);
      const getDistance = (lat1, lon1, lat2, lon2) => {
        const distance = haversineDistance({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 });
        return `${(distance / 1000).toFixed(2)} km`;
      };

      // Initialize the map
      const mymap = L.map('mapid').setView([doctorData.doctor_data.latitude, doctorData.doctor_data.longitude], 7);

      // Add a tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mymap);

      const groupDistances = {};

      // Loop through the recommendations and add markers to the map
      responseData.forEach(recommendation => {
        const groupPatients = recommendation[2];
        const groupRadius = calculateGroupRadius(doctorData.doctor_data.latitude, doctorData.doctor_data.longitude, groupPatients);
        const groupCenter = calculateGroupCenter(groupPatients);
        const groupCircle = L.circle(groupCenter, {
          radius: groupRadius,
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.5
        }).addTo(mymap);

        groupPatients.forEach(patient => {
          const doctorMarker = L.marker([doctorData.doctor_data.latitude, doctorData.doctor_data.longitude], {
            icon: L.icon({
              iconUrl: 'https://maps.google.com/mapfiles/ms/micons/blue.png',
              shadowUrl: 'https://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              shadowSize: [59, 32],
              shadowAnchor: [16, 32]
            })
          }).addTo(mymap);
          doctorMarker.bindPopup('Current doctor location');

          const distance = getDistance(doctorData.doctor_data.latitude, doctorData.doctor_data.longitude, patient[1], patient[2]);
          const marker = L.marker([patient[1], patient[2]], {
            icon: L.icon({
              iconUrl: 'https://maps.google.com/mapfiles/ms/micons/green.png',
              shadowUrl,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              shadowSize: [59, 32],
              shadowAnchor: [16, 32]
            })
          }).addTo(mymap);
          marker.bindPopup(`${patient[0]}<br>Distance: ${distance}<br><button style="background-color: #4CAF50;    margin-bottom: 30px;          border: none; color: #fff; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px;" onclick="openGoogleMaps(${patient[1]}, ${patient[2]})">Voir Sur La Carte</button>`);
        });
      });

      function calculateGroupCenter(patients) {
        const latitudes = patients.map(patient => patient[1]);
        const longitudes = patients.map(patient => patient[2]);
        const centerLat = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
        const centerLng = longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;
        return [centerLat, centerLng];
      }

      function calculateGroupRadius(centerLat, centerLng, patients) {
        const distances = patients.map(patient => getDistance(centerLat, centerLng, patient[1], patient[2]));
        const avgDistance = distances.reduce((sum, distance) => sum + parseFloat(distance), 0) / distances.length;
        return avgDistance * 1000; // Convert to meters
      }
    } catch (error) {
      console.log(error);
    }

  };

  const [selectedGroup, setSelectedGroup] = useState(null);



  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <Typography variant="h6" component="h2" style={{ color: '#70a5d7' }}>
          Spécifier votre liste des groupes
        </Typography>
        <div>
          <label htmlFor="maxdistance">Distance Maximale:</label>
          <Slider
            value={maxdistance}
            onChange={(e, newValue) => setMaxDistance(newValue)}
            aria-labelledby="maxdistance-label"
            step={1}
            marks
            min={0}
            max={500}
          />
          <div id="maxdistance-label">Distance Maximale: {maxdistance}</div>
        </div>
        <div>
          <label htmlFor="maxmembers">Nombre des patients:</label>
          <Slider
            value={maxmembers}
            onChange={(e, newValue) => setMaxMembers(newValue)}
            aria-labelledby="maxmembers-label"
            step={1}
            marks
            min={0}
            max={30}
          />
          <div id="maxmembers-label">Nombre des patients: {maxmembers}</div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={fetchRecommendations}
        >
          Confirmer
        </Button>
      </div>
      <div className={classes.recommendations}>
        <Typography variant="h3" component="h2" style={{ color: '#70a5d7', fontWeight: 'bold', fontSize: '35px' }} ref={recommendationsRef}>
          Groupes des patients
        </Typography>
        {recommendations.map((recommendation) => (
          <div key={recommendation[0]} className={classes.group}>
            <Card className={classes.card}>
              <CardHeader title={`Group ID: ${recommendation[0]}`} className={classes.cardHeader} />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1" color="textPrimary">
                  Commune: {recommendation[1]}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Patients:
                </Typography>
                <ul>
                  {recommendation[2].map((patient) => (
                    <li key={patient[0]}>Nom: {patient[0]}</li>
                    /* <li key={patient[0]}>
                    Name: {patient[0]}, Latitude: {patient[1]}, Longitude: {patient[2]}
                    </li>*/
                  ))}
                </ul>
              </CardContent>
              <div className={classes.cardActions}>
                <IconButton onClick={() => handleOpen(recommendation[0])}>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </IconButton>
              </div>
            </Card>
            <Dialog open={open === recommendation[0]} onClose={handleClose}>
              <DialogTitle>Fixer un rendez-vous pour ce groupe</DialogTitle>
              <DialogContent>
                <Calendar onChange={handleDateChange} value={selectedDate} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(recommendation[0])} color="primary">
                  Annuler
                </Button>
                <Button onClick={handleConfirmation} color="primary">
                  Confirmer
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      </div>
      <div className={classes.mapid} id="mapid"></div>
    </div>
  );


};

export default PatientList;


