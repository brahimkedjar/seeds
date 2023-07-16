import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationDialog from './Notifications';

const useStyles = makeStyles((theme) => ({
  notifications: {
    position: 'statix',
    margin: '7px ,0 ,0 , 25px',
    top: 60,
    right: 65,
    [theme.breakpoints.down('xs')]: {
      right: 0,
    },
  },
  notificationText: {
    fontSize: '18px',
  },
  '@media (max-width: 576px)': {
    notificationText: {
      fontSize: '14px',
    },
  },

  notificationIcon: {
    height: 40,
    width: 70,
    borderRadius: '50%',
    backgroundcolor: 'transparent',
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('xs')]: {
      width: 50,
    },
  },
}));

function NavBarPat(props) {
  const { userData } = props;
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const loadNotifications = async () => {
    try {
      const patientId = userData.patient_data.id;
      const apiUrl = '/api/v1/get_notifications';
      const response = await fetch(`${apiUrl}?patient_id=${patientId}`);
      const notificationMessages = await response.json();
      setNotifications(notificationMessages);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const handleNotificationClick = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    loadNotifications();
  }, [/* empty dependency array */]);

  return (
    <div className="NavBarPat">
      <div className="navigationPat">
        <Link to="/PatientPage/SearchDoctors">
          <span> Accueil </span>
        </Link>
        <Link to="/PatientPage/FindDoctor">
          <span> Annoncer un besoin </span>
        </Link>
        <div className={classes.notifications}>
          <span className={classes.notificationText}>Notifications</span>
          <IconButton
            className={classes.notificationIcon}
            onClick={handleNotificationClick}
          >
            <Badge
              badgeContent={notifications.length > 0 ? notifications.length : ""}
              color="secondary"
              overlap="rectangular"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <NotificationDialog
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            notifications={notifications}
          />
        </div>
      </div>
    </div>
  );

}

export default NavBarPat;
