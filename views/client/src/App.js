import Navbar from "./Navbar"
import Home from "./Home"
import Login from "./Login"
import { Route, Routes } from "react-router-dom";

function App() {
    return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </>
  )
}

export default App;
