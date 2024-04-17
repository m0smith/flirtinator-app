import React from 'react';
import { Button, Container, TextField, Typography, Select, MenuItem } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Flirtinator
      </Typography>
      <Select defaultValue="" fullWidth>
        <MenuItem value="Love">Love</MenuItem>
        <MenuItem value="Compliment">Compliment</MenuItem>
      </Select>
      <TextField fullWidth label="Enter Name" margin="normal" />
      <Button variant="contained" color="primary">
        Generate Image
      </Button>
    </Container>
  );
}

export default App;
