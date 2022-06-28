import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutPage from "./_pages/AboutPage";
import ContactPage from "./_pages/ContactPage";
import HomePage from "./_pages/HomePage";
import Login from "./_components/Login";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
