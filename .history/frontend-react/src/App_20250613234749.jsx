import { useState } from "react";
import "./assets/css/style.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
