import React from "react";
import Navbar from "./components/Navbar";

const App = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
};

export default App;
