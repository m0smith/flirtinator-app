import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar'; // Assuming Sidebar is a separate component
import Flirtinator from './Flirtinator';

function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <Sidebar />
          <Typography variant="h6" color="inherit">
            Flirtinator
          </Typography>
          
        </Toolbar>
      </AppBar>
      <main>
        <Flirtinator/> 
      </main>
    </>
  );
}

export default Layout;
