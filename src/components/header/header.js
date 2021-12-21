import React from 'react';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.scss'

const Header = ({ currentUser, cartHidden }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                    :
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                }
                <CartIcon />
            </div>
            {
                cartHidden ?
                null
                :
                <CartDropdown />
            }
        </div>
    )
}

// Used to subscribe to store updates to re-render the component if the state changes.
const mapStateToProps = (state) => {
    // The state argument is the root reducer
    return {
        currentUser: selectCurrentUser(state), // grabbing the currentUser state from userReducer function when state changes.
        cartHidden: selectCartHidden(state)
    }
}

export default connect(mapStateToProps)(Header);