import { Box, Grid, Typography, AppBar, Toolbar, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from "react";
import React from 'react';
import styles from '../css/Appointments.module.css';

function Appointments() {
  const [filteredTexts, setFilteredTexts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/notification_doctor');
        const data = await response.json();
        setFilteredTexts(data.notifications);
        setLoading(false);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" align="center" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <div className={styles.root2}>
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 10 ,marginLeft:'25%'}}>

        <Container sx={{ paddingTop: '10px', paddingBottom: '30px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 5 }}>

           <img src="/img/app.png" alt="Calendar" style={{ height: '300px', width: '450px' }} />
            </Box>

          <Grid container spacing={3} sx={{ marginTop: '30px' }}>
            <Grid item xs={12}>
            <Typography variant="h6" sx={{ mr: 2 ,marginBottom:'15px'}}>
             Vos Rendez-vous :
               </Typography>
              <TableContainer component={Box} sx={{ borderRadius: '20px', backgroundColor: 'white', boxShadow: '0px -1px 15px 0px rgba(0,0,0,0.08)' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Groupe
                      </TableCell>
                      <TableCell>
                      jour de rendez-vous
                      </TableCell>
                      <TableCell>
                      lieu de rendez-vous
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(filteredTexts).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>
                          {value.group_id}
                        </TableCell>
                        <TableCell>
                          {value.appointment_date}
                        </TableCell>
                        <TableCell>
                          {value.place}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Appointments;
