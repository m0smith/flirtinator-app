import React from 'react';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Box, Typography, Toolbar, AppBar } from '@mui/material';

function PersistentSidebar({ children }) {
  const drawerWidth = 240;  // You can adjust the width of the drawer here

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Flirtinator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open
      >
        <Toolbar /> {/* This Toolbar component adds padding at the top equal to the AppBar's height */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component="a" href="http://ferociousflirting.com" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="Visit Ferocious Flirting" />
            </ListItem>
            <ListItem button component="a" href="https://amzn.to/3W6HycK" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="Buy the Book on Amazon" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar /> {/* This second Toolbar component is necessary to push down the content so it doesn't go under the AppBar */}
        {children}
      </Box>
    </Box>
  );
}

export default PersistentSidebar;
