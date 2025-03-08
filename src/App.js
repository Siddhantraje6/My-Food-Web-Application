import './App.css';
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { CartProvider } from './components/ContextReducer';
 
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path = "/" element = {<Home/>} />
          <Route exact path = "/Login" element = {<Login/>} />
          <Route exact path = "/Signup" element = {<Signup/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
