import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';

function App() {
    let component 
    switch (window.location.pathname) {
        case "/":
            component = <Home />
            break
        case "/login":
            component = <Login />
            break
    }
    return (
    <>
        <Navbar />
        <div class="container">{component}</div>
    </>
    ) 
}

export default App;
