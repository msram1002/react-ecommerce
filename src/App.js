import React, {useState, useEffect} from 'react';
// import Products from './components/Product/Products';
// import Navbar from './components/Navbar/Navbar';
import { Products, Navbar, Cart } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  // For the products
  const [products, setProducts] = useState([]);

  // Set the initial cart count and update as user add to cart
  const [cart, setCart] = useState({});

  const fetchProd = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  useEffect(() => {
    fetchProd();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart= {handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={ cart } />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
