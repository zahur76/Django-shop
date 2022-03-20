import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Products from '../Products/Products';
import Admin from '../Admin/Admin'
import Checkout from '../Checkout/Checkout';
import './App.css'
import { React, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const[quantity, itemQuantity]=useState(null);
  const[active, setOnActive]=useState(null);

  
  function onQuantity(quantity) {
    console.log(quantity)
    itemQuantity(quantity)
  }

  function onActive(active) {
    setOnActive(active)
  }


  function onStatus(status) {
    setOnActive(status)
  }

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes className="App">
            <Route path="/" element={<div><Header setActive={onActive} onQuantity={quantity} /> <Products  setStatus={onStatus} onQuantity={onQuantity} onActive={active}/> <Footer /> </div>} />
            <Route path="/admin" element={<div><Header /> <Admin/> <Footer /> </div>} />
            <Route path="/checkout" element={<div><Header /> <Checkout /> <Footer /> </div>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;