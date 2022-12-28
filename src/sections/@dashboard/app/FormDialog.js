import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth style={{marginBottom: "5%", marginTop: "3%"}} variant="contained" size="large" onClick={handleClickOpen}>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}