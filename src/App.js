import React from 'react';
import Homepage from './pages/homepage/homepage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const HatsPage = () => {
  return (
    <div>
      <h1>HATS PAGE</h1>
    </div>
  )
}

function App() {
  return (
    <div >
      <Routes>
          <Route path='/' element={ <Homepage />}/>
          <Route path='shop/hats' element={ <HatsPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
