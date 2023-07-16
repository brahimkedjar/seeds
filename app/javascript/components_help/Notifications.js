import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
  },
  message: {
    fontWeight: 'bold',
  },
}));

function NotificationDialog(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle className={classes.title}>Notifications</DialogTitle>
      <DialogContent dividers>
        {props.notifications.map((notification) => (
          <DialogContentText className={classes.message} key={notification.id}>
            {notification.message}
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationDialog;
