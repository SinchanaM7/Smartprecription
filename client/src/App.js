import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

import Home from "./pages/Home/Home";
import LoginP from "./pages/login/Loginp";
import RegesterR from "./pages/Regester_Receps/RegesterR";
import DocForm from "./pages/Doc_reg/DocReg";
import Doctors from "./pages/Doctors/Doctors";
import Nav from "./components/Navbar";
import WaveB from "./components/WaveB/WaveB";
import Temp from "./pages/testi/Temp"

import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        {/* <Nav /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/regesterr" element={<RegesterR />} />
            <Route path="/addpresc" element={<DocForm />} />
            <Route path="/presc" element={<Doctors />} />
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
