import React, { Component } from 'react';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';

import { Route, Routes, Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selector';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

class App extends Component {
  // Don't want memory leaks so we need to unsubscribe from open subscriptions
  // Setting a property to help unsubscribe from the auth subscription 
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // Built in method from auth firebase library that checks if a user has logged in using OAuth.
    // This is an open subscription between this application and Firebase.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Check if there is an authenticated user that is logged in
      if(userAuth) {
        // If there is an authenticated user logged in, retrieve the document reference object of the user
        const userRef = await createUserProfileDocument(userAuth);

        // Receive the document snapshot object from the document reference object
        // In this case, we are receiving the data from the created user document reference object of the authenticated user
        // Upon receiving the snapshot object from the document reference object, we will set the state of the logged in authenticated user
        userRef.onSnapshot(snapShot => {
          // Calls the dispatch action setCurrentUser to set the state as the new snapshot data object
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      else {
        // We still need to check if the logged in authenticated user is null, if it is then set the currentUser state as null.
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // This will close the open subscription between this app and Firebase when the component unmounts.
    this.unsubscribeFromAuth();
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

const mapDispatchToProps = dispatch => {
  return {
    // dispatch() is a way to pass an action object to every reducer
    // we can now use this new setCurrentUser object function property to set the state of the currentUser
    setCurrentUser: user => dispatch(setCurrentUser(user)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
