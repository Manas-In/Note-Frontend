import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateNote from "./pages/CreateNote";
import axios from "axios";
import NoteDetails from "./pages/NoteDetails";
import UpdateNote from "./pages/UpdateNote";
import Search from "./components/Search";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AuthProvider from "./AuthProvider";
import { PrivateRoutes, PublicRoutes } from "./Routes";
import NotFound from "./components/NotFound";
import NoteCardCoantainer from "./components/NoteCardCoantainer";
import LoginPages from "./pages/LoginPage";

function App() {


  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
            < Route path = '*' element = {< NotFound />}/>
          <Route path="/" element= {<PublicRoutes>< Home/></PublicRoutes>}/>
          <Route path="/NoteDetails/:slug" element={<PrivateRoutes><NoteDetails /></PrivateRoutes>} />
          <Route path="/create-note" element={<PrivateRoutes><CreateNote /></PrivateRoutes>} />
          <Route path="/update-note/:slug" element ={<PrivateRoutes><UpdateNote /></PrivateRoutes>}/>
          <Route path="/notes" element ={<PrivateRoutes><NoteCardCoantainer /></PrivateRoutes>}/>
          <Route path="/login" element= {<PublicRoutes>< Login/></PublicRoutes>}/>
          <Route path="/registration" element= {<PublicRoutes><Registration /></PublicRoutes>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
