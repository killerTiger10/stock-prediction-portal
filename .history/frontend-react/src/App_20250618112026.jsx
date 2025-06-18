import { useState } from "react";
import "./assets/css/style.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
