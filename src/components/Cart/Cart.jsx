import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ( { cart } ) => {
  const classes = useStyles();

  // sub components returning JSX
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You do not have any items in your shopping cart.
      <Link to="/" className={classes.link}>Start adding some!</Link>
    </Typography>
  )

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) =>(
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item}/>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
            <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
          </div>
      </div>
    </>
  )

  if(!cart.line_items) return 'Loading ...';

  return (
    <div>
      <Container>
        <div className={classes.toolbar}></div>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        { cart.line_items_length? <EmptyCart /> : <FilledCart /> }
      </Container>
    </div>
  )
}

export default Cart;
