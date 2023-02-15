import * as React from 'react';
import {useState, useContext } from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, TextField } from '@mui/material';
import ResponseContext from '../../../components/response/ResponseContext'

export default function FormDialog() {
  const { hrvResponse, setHrvResponse } = useContext(ResponseContext);

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
    console.log(e)
    try {
      // const response = await fetch("http://127.0.0.1:5000/predict", {
      // const response = await fetch("https://elec49x.herokuapp.com/predict", {
      const response = await fetch("https://shiyanboxer.pythonanywhere.com/predict", {
        method: "POST",
        body: JSON.stringify({
          hrv,
        }),
      });
      const stringResponse = await response.json();
      const responseJSON = await JSON.parse(stringResponse);
      if (response.status === 200) {
        setHrvResponse(responseJSON);

        // Reset HRV value, add success message, close prompt
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
        BONK
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
            id="hrv_value"
            label="Heart Rate Variability Value"
            variant="standard"
            type="number"
            required
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
            inputProps={{ max: 300, min: 10, pattern: '[0-9]'}}
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