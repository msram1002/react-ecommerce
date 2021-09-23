import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, handleEmptyCart, handleRemoveFromCart, handleUpdateCartQty }) => {
  const classes = useStyles();

  // sub components returning JSX
  const EmptyCart = () => (
    <Typography variant="h6">
      You do not have any items in your shopping cart.&nbsp;
      <Link to="/" className={classes.link}>Start adding some!</Link>
    </Typography>
  )

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) =>(
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}/>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
          <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  )

  return (
    <div>
      <Container>
        <div className={classes.toolbar}></div>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart.total_items? <EmptyCart /> : <FilledCart />}
      </Container>
    </div>
  )
}

export default Cart;
