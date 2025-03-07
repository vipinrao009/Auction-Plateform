import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import './App.css'
import Home from "./pages/home";
import SideDrawer from "./Layout/SideDrawer.jsx";
import About from "./pages/About.jsx";

function App() {

  return (
   <Router>
    <SideDrawer/>
      <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/about" element={<About/>} />
      </Routes>
      <ToastContainer position="top-right"/>
   </Router>
  )
}

export default App
