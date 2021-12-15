import React from 'react';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div >
      <Routes>
          <Route path='/' element={ <Homepage />}/>
          <Route path='shop' element={ <ShopPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
