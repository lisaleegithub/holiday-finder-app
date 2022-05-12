import './App.css';
import Login from './components/Login';
import Trip from './components/Trip';
import { useState, useEffect } from "react";
import Navigation from './components/Navigation';
import { Outlet } from "react-router-dom";


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
    <div className="container">
      <Navigation />
      <Outlet />
      <Login user={user}/>
      {user ? <Trip user={user}/> : (<h3>Please login</h3>)}
      {/* add how to use this app */}
    </div>
  );
}

export default App;
