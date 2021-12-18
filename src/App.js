import React from 'react';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div >
      { 
        /* Header/Navigation must be out of the Routes component so that it is 
           always rendered regardless of which path the page is on */
      }
      <Header />
      <Routes>
          <Route path='/' element={ <Homepage />}/>
          <Route path='shop' element={ <ShopPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
