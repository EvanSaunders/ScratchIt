import logo from './logo.svg';
import './App.css';
import Appbar from "./components/Appbar"
import UserFields from "./components/UserFields"
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import CreatePage from "./components/CreatePage";
import Home from "./components/Home";
import ViewCardPage from "./components/ViewCardPage";
import {AuthProvider} from "./components/AuthContext";
import {useEffect} from "react";
import {gapi} from "gapi-script";


const App = () => {

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
    }


    useEffect(() => {
       /* global google */
        google.accounts.id.initialize({
            client_id: "282650218440-6vb2j84rru32vf15iuli4bddqdpkq61l.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size:"large"}
        )
    }, []); // Empty dependency array means this effect runs once when the component mounts
    return (

        <AuthProvider>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />}></Route>
                <Route path="/create-cards" element={<CreatePage />}></Route>
                <Route path="/view-card" element={<ViewCardPage />}></Route>
                <Route path="/view-card/:primaryKey" element={<ViewCardPage />} />

            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
