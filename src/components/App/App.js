import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Products from '../Products/Products';
import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes className="App">
            <Route path="/" element={<div><Header />  <Products /> <Footer /> </div>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;