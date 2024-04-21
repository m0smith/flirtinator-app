import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText,ListItemButton, IconButton, CssBaseline } from '@mui/material';
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
            <ListItem component="a" href="https://www.ferociousflirting.com/" target="_blank" rel="noopener noreferrer">
              <ListItemButton primary="Visit Ferocious Flirting" />
            </ListItem>
            <ListItem component="a" href="https://amzn.to/3W6HycK" target="_blank" rel="noopener noreferrer">
              <ListItemButton primary="Buy the Book on Amazon" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
