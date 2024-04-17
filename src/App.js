import React, { useState, useRef } from 'react';
import { Button, Container, TextField, Typography, Select, MenuItem } from '@mui/material';
import sayings from './sayings.json';

function App() {
  const [saying, setSaying] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const updateSaying = (e) => {

    // const name = nameRef.current.value;
    // const category = categoryRef.current.value;
    const sayingsList = sayings[category];
    console.log("category:" + category); // Check the value of category
    console.log("name:" + name); // Log the whole sayings object to see its structure
    console.log(sayings)
    console.log(sayings[category]); // Check what this evaluates to

    if (!sayingsList) {
      console.log("Please select a valid category")
      return
    }
    const randomIndex = Math.floor(Math.random() * sayingsList.length);
    const randomSaying = sayingsList[randomIndex];
    const rtnval = randomSaying.replace('{name}', name);
    console.log(rtnval)
    setSaying(rtnval);
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Flirtinator
      </Typography>
      <Select defaultValue="" fullWidth onChange={(e) => setCategory(e.target.value)}>
        {Object.keys(sayings).map((key) => (
          <MenuItem key={key} value={key}>{key}</MenuItem>
        ))}

      </Select>
      <TextField fullWidth label="Enter Name" margin="normal" onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" color="primary" onClick={updateSaying}>
        Generate Image
      </Button>
      {saying && <p>{saying}</p>}
    </Container>
  );
}

export default App;
