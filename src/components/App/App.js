import Header from '../Header/Header';

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
            <Route path="/" element={<Header /> } />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;