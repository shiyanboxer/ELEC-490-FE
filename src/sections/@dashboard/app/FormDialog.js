import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [hrv, setHrv] = useState("");
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setMessage("");

  };
  const handleClose = () => {
    setOpen(false);
  };

  // https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HWERWER")
    console.log(e)
    try {
      const response = await fetch("https://dummyendpoint", {
        method: "POST",
        body: JSON.stringify({
          hrv,
        }),
      });
      const responseJSON = await response.json();
      if (response.status === 200) {
        console.log("Successful")
        setHrv("");
        setMessage("HRV value successfully submitted");
        setOpen(false);
      } else {
        setMessage("An error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button fullWidth style={{marginBottom: "2%", marginTop: "3%"}} variant="contained" size="large" onClick={handleClickOpen}>
        Heart Rate Variability Value
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Heart Rate Variability Value</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your HRV value to view your updated recovery score and recommendations. A normal HRV value ranges between 20-200 ms.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Heart Rate Variability Value"
            variant="standard"
            type="number"
            required="true"
            onChange={(e) => setHrv(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button  onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="subtitle1" color="green" style={{marginBottom: "2%", marginTop: "1%"}}>{message ? <p>{message}</p> : null}</Typography>
      
    </div>
  );
}