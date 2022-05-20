import React, { createContext, useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Contact from "./Components/Contact";
import Errorpage from "./Components/Errorpage";
import Logout from "./Components/Logout";
import { initialState, reducer } from "./Reducer/useReducer";
export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
