import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../../lib/commerce';

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

  // Run on the initial load of checkout page
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  // Whenever shipping country changes, call the function
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit=''>
          <Grid container spacing={3}>
            <CustomTextField required name="firstName" label="First Name"/>
            <CustomTextField required name="lastName" label="Last Name"/>
            <CustomTextField required name="address1" label="Address"/>
            <CustomTextField required name="email" label="Email"/>
            <CustomTextField required name="city" label="City"/>
            <CustomTextField required name="zip" label="Zip/ Postal Code"/>
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
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;
