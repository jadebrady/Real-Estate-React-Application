
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from "react-bootstrap";
import NavBar from './components/NavBar.jsx';
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>    
      <NavBar />
      <Outlet />
      <Footer />
    </AuthProvider>

  )
}

export default App
