import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import ProductManagement from "./components/Admin/Container/ProductManagement";
import Chat from "./Chat";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Chat/>
    </div>
  );
}

export default App;
