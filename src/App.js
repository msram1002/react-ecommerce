import React, { useState, useEffect } from 'react';
// import Products from './components/Product/Products';
// import Navbar from './components/Navbar/Navbar';
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  // For the products
  const [products, setProducts] = useState([]);
  // Set the initial cart count and update as user add to cart
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errMsg, setErrMsg] = useState('');

  const fetchProd = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const addItem = await commerce.cart.add(productId, quantity);
    setCart(addItem.cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const updateCart = await commerce.cart.update(productId, {quantity});
    setCart (updateCart.cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const removeCart = await commerce.cart.remove(productId);
    setCart (removeCart.cart);
  }

  const handleEmptyCart = async () => {
    const emptyTheCart = await commerce.cart.empty();
    setCart (emptyTheCart.cart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      // Need to add card details for using stripe on commerce js
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      // setOrder(newOrder);
      refreshCart();
    } catch (error) {
      setErrMsg(error.data.error.message);
    }
  }

  // After order getting processed 
  // we need to clear the cart
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
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
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart 
            cart={cart}
            handleEmptyCart={handleEmptyCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleUpdateCartQty={handleUpdateCartQty} />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} order= {order} onCaptureCheckout={handleCaptureCheckout}
            error={errMsg}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
