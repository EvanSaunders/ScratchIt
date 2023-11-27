import logo from './logo.svg';
import './App.css';
import Appbar from "./components/Appbar"
import UserFields from "./components/UserFields"
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import CreatePage from "./components/CreatePage";
import Home from "./components/Home";
import ViewCardPage from "./components/ViewCardPage";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/create-cards" element={<CreatePage />}></Route>
                <Route path="/view-card" element={<ViewCardPage />}></Route>
                <Route path="/view-card/:primaryKey" element={<ViewCardPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
