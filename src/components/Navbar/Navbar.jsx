import React from 'react';
import { AppBar, ToolBar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

const Navbar = () => {
  return (
    <>
      <AppBar position="fixed" className={classes.AppBar} color="inherit">
        <ToolBar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={} alt="E-commerce" height="25px" className={classes.image} />
              SRM E-Commerce Store
          </Typography>
        </ToolBar>
      </AppBar>
    </>
  )
}

export default Navbar;
