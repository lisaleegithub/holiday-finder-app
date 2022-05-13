import './App.css';
import Navigation from './components/Navigation';
import { Outlet } from "react-router-dom";

function Page() {

  return (
    <div className="container">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Page;
