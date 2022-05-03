import './App.css';
import Login from './components/Login';
import Trip from './components/Trip';
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
    <div className="App">
      <Login user={user}/>
      {/* <Trip /> */}
      {user ? <Trip /> : (<h3>Please login</h3>)}
      {/* add how to use this app */}
    </div>
  );
}

export default App;
