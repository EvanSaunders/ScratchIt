import logo from './logo.svg';
import './App.css';
import Appbar from "./components/Appbar"
import UserFields from "./components/UserFields"
function App() {
  return (
    <div className="App">
      <Appbar/>
        <UserFields/>
    </div>
  );
}

export default App;
