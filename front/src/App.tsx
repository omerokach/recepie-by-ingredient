import React from "react";
import "./App.css";
import Background from "./pages/background";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecepiePage from "./pages/Recepie";

function App() {
  return (
    <div className="App">
      <Background />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/recepie" element={<RecepiePage recepie={} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
