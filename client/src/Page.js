import './App.css';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { Outlet } from "react-router-dom";

function Page({ user }) {

  return (
    <div className="container">
      <Navigation />
      <Login user={user}/>
      <Outlet />
      {/* <Login user={user}/> */}
    </div>
  );
}

export default Page;
