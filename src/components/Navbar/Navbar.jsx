import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/e-commerce.png';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.AppBar} color="inherit">
        <Toolbar>
          <Typography variant="h5" className={classes.title} color="inherit">
            <img src={logo} alt="ecommerce" height="70px" className={classes.image} />
              SRM E-Commerce Store
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;