import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import Item from './components/Item';
import ProtectedRoutes from './components/ProtectedRoutes';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);


  useEffect(() => {
   
    setTimeout(() => {
      axios.get('tu-url-de-api')
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }, 5000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }




  return (
    <div className="App">

      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<Item />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
