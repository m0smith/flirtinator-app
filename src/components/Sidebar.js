import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Sidebar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State to control the open/close

  const toggleDrawer = (open) => (event) => {
    // This function will toggle the drawer open/close state
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <CssBaseline />
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button component="a" href="http://ferocioousflirting.com" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="Visit Ferocious Flirting" />
            </ListItem>
            <ListItem button component="a" href="https://amzn.to/3W6HycK" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="Buy the Book on Amazon" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
