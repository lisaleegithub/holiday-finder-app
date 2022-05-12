import React from 'react';
import './index.css';
import Page from './Page';
import Home from './Routes/Home';
import Contact from './Routes/Contact';
import About from './Routes/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
    const [user, setUser] = useState(undefined);

  const loadUser = () => {
    fetch("/api/me")
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          return undefined;
        }
      })
      .then(user => {
        setUser(user)
      })
  };

  useEffect(() => {
    loadUser();
  }, []);

return (
    <Router>
        <Routes>
            <Route path="/" element={<Page user={user}/>}>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Route>
        </Routes>
    </Router>
    )
}

export default App;