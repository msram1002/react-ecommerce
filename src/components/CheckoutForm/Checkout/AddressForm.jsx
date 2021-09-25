import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';
import CustomTextField from './CustomTextField';

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisons, setShippingSubdivisons] = useState([]);
  const [shippingSubdivison, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  
  const methods = useForm();
  const countries = Object.entries(shippingCountries).map(([countryCode, countryName]) => ({ id: countryCode, label: countryName}));
  const subdivisions = Object.entries(shippingSubdivisons).map(([subdivCode, subdivName]) => ({ id: subdivCode, label: subdivName}));
  const options = shippingOptions.map((shipOption) => ({id: shipOption.id, label: `${shipOption.description} - (${shipOption.price.formatted_with_symbol})`}));


  const fetchShippingCountries = async(checkoutTokenId) => {
    // Need Token Id to retrieve the shipping countries
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    // Set a single country the first among the list
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async(countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisons(subdivisions);
    // Set the selected subdivisions for the appropriate country
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async(checkoutTokenId, country, region=null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    setShippingOptions(options);
    // Get the first Shipping Option
    setShippingOption(options[0].id);
  };

  // Run on the initial load of checkout page
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  // Whenever shipping country changes, call the function
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  // Whenever shipping subdivision changes, call the function
  useEffect(() => {
    if (shippingSubdivison) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivison);
  }, [shippingSubdivison]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit=''>
          <Grid container spacing={3}>
            <CustomTextField name="firstName" label="First Name"/>
            <CustomTextField name="lastName" label="Last Name"/>
            <CustomTextField name="address1" label="Address"/>
            <CustomTextField name="email" label="Email"/>
            <CustomTextField name="city" label="City"/>
            <CustomTextField name="zip" label="Zip/ Postal Code"/>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => ( 
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivison</InputLabel>
              <Select value={shippingSubdivison} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => ( 
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => ( 
                  <MenuItem key={option.id}
                    value={option.id}>
                    {option.label}
                  </MenuItem>))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>

          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;
