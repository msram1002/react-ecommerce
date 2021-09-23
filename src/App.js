import React, {useState, useEffect} from 'react';
// import Products from './components/Product/Products';
// import Navbar from './components/Navbar/Navbar';
import { Products, Navbar } from './components';
import { commerce } from './lib/commerce';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProd = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProd();
  }, []);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  )
}

export default App;
