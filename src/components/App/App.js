import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Products from '../Products/Products';
import Admin from '../Admin/Admin'
import './App.css'
import { React, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const[quantity, itemQuantity]=useState(null);
  
  function onQuantity(quantity) {
    console.log(quantity)
    itemQuantity(quantity)
  }

  function onActive(active) {
    console.log(active)
  }
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes className="App">
            <Route path="/" element={<div><Header setActive={onActive} onQuantity={quantity} /> <Products onQuantity={onQuantity} /> <Footer /> </div>} />
            <Route path="/admin" element={<div><Header /> <Admin/> <Footer /> </div>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;