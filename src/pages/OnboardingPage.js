import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';


export default function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
    
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleOnClick = (event) => {
    // const url = 'http://127.0.0.1:5001/';
    const url = 'https://shiyanboxer.pythonanywhere.com/';
    window.location.href = url;
  };

  const handleSubmit = async (event) => {    
    event.preventDefault();
    try {
      const response = await fetch('https://shiyanboxer.pythonanywhere.com/onboarding', {
        // const response = await fetch('http://127.0.0.1:5000/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, gender, age })
      });
      const data = await response.json();
      console.log(data);
      // If the form data was successfully submitted, navigate to the dashboard page
      // navigate('dashboard', { replace: true });       
      // const url = 'http://127.0.0.1:5000';
      // const url = 'https://elec49x.herokuapp.com/';      
      // const url = 'https://shiyanboxer.pythonanywhere.com/';
      // window.location.href = url;
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Helmet>
        <title>Onboarding | BONK</title>
      </Helmet>

      <Container>
        <Box sx={{ marginTop: '10%', textAlign: 'center', alignItems: 'center', background: '#F9FAFB' }}>
          <Typography variant="h3" paragraph>
            Welcome to BONK
          </Typography>
          <Typography variant="subtitle1" paragraph>
          We're excited to help you with your recovery journey, but first, we have a few questions to ask you so that we can personalize our recommendations
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              margin="normal"
              fullWidth
              required
            />

            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              fullWidth
              required
            />

            <FormControl component="fieldset" margin="normal" fullWidth required>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <FormControl variant="outlined" margin="normal" fullWidth required>
              <TextField
                id="age"
                type="number"
                label="Age"
                variant="outlined"
                value={age}
                onChange={handleAgeChange}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
            </FormControl>
            <FormControl variant="outlined" margin="normal" fullWidth required>
              <TextField
                id="training"
                type="number"
                label="Training House / Week"
                variant="outlined"
                value={age}
                onChange={handleAgeChange}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
            </FormControl>
            <FormControl component="fieldset" margin="normal" fullWidth required>
              <FormLabel component="legend">How would you describe your fitness</FormLabel>
              <RadioGroup aria-label="fitness" name="fitness" value={gender} onChange={handleGenderChange}>
                <FormControlLabel value="Novice" control={<Radio />} label="Novice" />
                <FormControlLabel value="Amature" control={<Radio />} label="Amature" />
                <FormControlLabel value="Pro" control={<Radio />} label="Pro" />
              </RadioGroup>
            </FormControl>
            <FormControl variant="outlined" margin="normal" fullWidth required>
              <TextField
                id="events"
                type="text"
                label="What events are you training for"
                variant="outlined"
                value={age}
                onChange={handleAgeChange}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
            </FormControl>


            <Button type="submit" size="large" variant="contained" onClick={handleOnClick}>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
