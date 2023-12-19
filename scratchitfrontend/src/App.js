import logo from './logo.svg';
import './App.css';
import Appbar from "./components/Appbar"
import UserFields from "./components/UserFields"
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import CreatePage from "./components/CreatePage";
import Home from "./components/Home";
import ViewCardPage from "./components/ViewCardPage";
import {AuthProvider} from "./components/AuthContext";
import {useEffect, useState} from "react";
import {gapi} from "gapi-script";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login";



const App = () => {


     // Empty dependency array means this effect runs once when the component mounts





    return (

        <AuthProvider>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/create-cards" element={<CreatePage />}></Route>
                <Route path="/view-card" element={<ViewCardPage />}></Route>
                <Route path="/view-card/:primaryKey" element={<ViewCardPage />} />

            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
