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
import ViewSentCards from "./components/ViewSentCards";
import NotFound from "./components/NotFound";



const App = () => {



    useEffect(() => {
        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        var themeToggleBtn = document.getElementById('theme-toggle');

        // Function to set the theme based on the preference
        const setTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleLightIcon.classList.add('hidden');
                themeToggleDarkIcon.classList.remove('hidden');
            }
        };

        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        // Event listener for the theme toggle button
        themeToggleBtn.addEventListener('click', function () {
            // Toggle and store theme preference
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            setTheme(newTheme);
            localStorage.setItem('color-theme', newTheme);
        });
    }, []);




    return (

        <AuthProvider >
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/create-cards" element={<CreatePage />}></Route>
                <Route path="/view-card" element={<ViewCardPage />}></Route>
                <Route path="/view-card/:primaryKey" element={<ViewCardPage />} />
                <Route path="/view-sent-cards" element={<ViewSentCards/>}/>

                <Route path='*' element={<NotFound />}/>

            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
