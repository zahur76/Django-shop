import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Products from '../Products/Products';
import SearchBar from '../SearchBar/SearchBar';
import './App.css'
import { React, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const[search, searchStatus]=useState(null);

  function onSearch(search) {    
    searchStatus(search)
    console.log(search)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes className="App">
            <Route path="/" element={<div><Header /> <SearchBar onSearch={onSearch}/> <Products searchStatus={search}/> <Footer /> </div>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;