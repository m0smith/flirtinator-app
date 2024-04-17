import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import sayings from './sayings.json';
import Cookies from 'js-cookie';

const categories = Object.keys(sayings)

const randomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  const rtnval = categories[randomIndex];
  return rtnval
}

function App() {
  const [saying, setSaying] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('random');

  useEffect(() => {
    // Retrieve the name from cookie at component mount
    const savedName = Cookies.get('name');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  useEffect(() => {
    // Save the name to a cookie whenever it changes
    Cookies.set('name', name, { expires: 7 }); // Expires in 7 days
  }, [name]);

  const updateSaying = (e) => {

    // const name = nameRef.current.value;
    // const category = categoryRef.current.value;
    const selectedCategory = category === "random" ? randomCategory() : category;
    const sayingsList = sayings[selectedCategory];
    console.log("category:" + selectedCategory); // Check the value of category
    console.log("name:" + name); // Log the whole sayings object to see its structure
    console.log(sayings)
    console.log(sayings[selectedCategory]); // Check what this evaluates to

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
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" value={category} defaultValue="" fullWidth onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="random">Suprise Me!</MenuItem>
          {categories.map((key) => (

            <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}

        </Select>
      </FormControl>
      <TextField fullWidth value={name} label="Enter Name" margin="normal" onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" color="primary" onClick={updateSaying}>
        Generate Image
      </Button>
      {saying && <p>{saying}</p>}
    </Container>
  );
}

export default App;
