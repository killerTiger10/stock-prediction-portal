import { useState } from "react";
import "./assets/css/style.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
