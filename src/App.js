import React, { useEffect } from 'react';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';

import { Route, Routes, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';

import { checkUserSession } from './redux/user/user.actions';

import './App.css';

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // componentDidMount using useEffect
  // checkUserSession is added into the array because it is a dispatch prop that is passed in from redux
  // If it is not added into the array, it can possibly trigger twice.
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div >
      { 
        /* Header/Navigation must be out of the Routes component so that it is 
            always rendered regardless of which path the page is on */
      }
      <Header />
      <Routes>
          <Route path='/' element={ <Homepage />}/>
          <Route path='shop/*' element={ <ShopPage /> }/>
          <Route path='checkout' element={ <CheckoutPage /> }/>
          {/* When a currentUser exists, we re-direct to the home page */}
          <Route path='signin' element={currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />}/>
      </Routes>
    </div>
  );
}

export default App;
