import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/electron-vite.animate.svg';
import {User} from './models/user.model.ts' 
import {UserController} from './controllers/user.controller.ts' 

// Components
import Sidebar from './components/sidebar/Sidebar';

// Views
import Productos from './views/productos/Productos.tsx'; // Importamos la nueva vista

import './App.css';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [count, setCount] = useState(0);


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log("Aver que pasa")
    const usuario = new User("Juan Sebastian", "tuco@jijas.com", "pass123")
    console.log(usuario)

    UserController.createUser(usuario);
  }

  return (
    <Router>
      <div>
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div
          style={{
            marginLeft: isExpanded ? '250px' : '60px',
            padding: '20px',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          <Routes>
            <Route path="/datos" element={<h1>Datos del negocio</h1>} />
            <Route path="/stock" element={<h1>Stock</h1>} />
            <Route path="/balance" element={<h1>Balance</h1>} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/mesas" element={<h1>Mesas</h1>} />
            <Route path="/" element={<h1>Bienvenido a la aplicación</h1>} />
          </Routes>
          <div>
            <a onClick={(e) => handleClick(e)}>
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </Router>
  );
}

export default App;
