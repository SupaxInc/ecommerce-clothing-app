import React, { Component } from 'react';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup';
import Header from './components/header/header';
import { Route, Routes } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  // Don't want memory leaks so we need to unsubscribe from open subscriptions
  // Setting a property to help unsubscribe from the auth subscription 
  unsubscribeFromAuth = null

  componentDidMount() {
    // Built in method from auth firebase library that checks if a user has logged in using OAuth.
    // This is an open subscription between this application and Firebase.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Check if the userAuth exists
      if(userAuth) {
        // If there is an authenticated user logged in, retrieve the document reference object of the user
        const userRef = await createUserProfileDocument(userAuth);

        // Receive the document snapshot object from the document reference object
        // In this case, we are receiving the data from the created user document reference object of the authenticated user
        // Upon receiving the snapshot object from the document reference object, we will set the state of the logged in authenticated user
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      else {
        // We still need to check if the logged in authenticated user is null, if it is then set the currentUser state as null.
        this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount() {
    // This will close the open subscription between this app and Firebase when the component unmounts.
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div >
        { 
          /* Header/Navigation must be out of the Routes component so that it is 
             always rendered regardless of which path the page is on */
        }
        <Header currentUser={currentUser}/>
        <Routes>
            <Route path='/' element={ <Homepage />}/>
            <Route path='shop' element={ <ShopPage /> }/>
            <Route path='signin' element={ <SignInAndSignUpPage /> }/>
        </Routes>
      </div>
    );
  }

}

export default App;
