// Import the Commerce module
import Commerce from '@chec/commerce.js';

// Create a Commerce instance
// const commerce = new Commerce('{public_api_key}');
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);
