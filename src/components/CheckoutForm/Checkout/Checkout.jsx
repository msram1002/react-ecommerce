import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

import useStyles from './styles';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  // Generate Checkout Token as user clicks on Checkout
  useEffect(() => { 
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    }
    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }
  // Handling the shipping data
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} />: <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>;

  let Confirmation = () => order.customer ? ( 
    <>
      <div> 
        <Typography variant="h6">
          Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}.
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          Order Reference: {order.customer_ref}
        </Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </div>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );

  if (error) {
    <>
      <Typography variant="h5">
        Error: {error}
      </Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">Back to Home
        </Button>
    </>
  }

  return (
    <>
    <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) =>(
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* If we are on the last step */}
          {/* The && condition is to show the form only when token gets generated as address form needs the token */}
          { activeStep === steps.length ? <Confirmation /> : checkoutToken &&<Form/> }
        </Paper>
      </main>
    </>
  )
}

export default Checkout;
