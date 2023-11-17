import logo from './logo.svg';
import './App.css';
import Appbar from "./components/Appbar"
import UserFields from "./components/UserFields"
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import CreatePage from "./components/CreatePage";
import Home from "./components/Home";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/createCards" element={<CreatePage />}></Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
