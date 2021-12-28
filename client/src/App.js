import React, { useEffect, lazy, Suspense } from 'react';

import Header from './components/header/header';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Spinner from './components/spinner/spinner';

import { Route, Routes, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';

import { checkUserSession } from './redux/user/user.actions';

import { GlobalStyle } from './global.styles';

// Lazy loading components
const Homepage = lazy(() => import('./pages/homepage/homepage'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(() => import('./pages/signin-and-signup/signin-and-signup'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));

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
        /* 
          Applying the global style styled component to every component
        */
      }
      <GlobalStyle />
      { 
        /* Header/Navigation must be out of the Routes component so that it is 
            always rendered regardless of which path the page is on */
      }
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
              <Route path='/' element={ <Homepage />}/>
              <Route path='shop/*' element={ <ShopPage /> }/>
              <Route path='checkout' element={ <CheckoutPage /> }/>
              {/* When a currentUser exists, we re-direct to the home page */}
              <Route path='signin' element={currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />}/>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
