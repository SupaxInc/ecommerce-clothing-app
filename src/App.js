import React, { Component } from 'react';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';

import { Route, Routes, Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';

import { checkUserSession } from './redux/user/user.actions';

import './App.css';

class App extends Component {

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const { currentUser } = this.props;

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

}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
