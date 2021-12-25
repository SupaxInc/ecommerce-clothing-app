import React from 'react';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import { connect } from 'react-redux';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles';

const Header = ({ currentUser, cartHidden, signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ? 
                    <OptionDiv onClick={signOutStart}>
                        SIGN OUT
                    </OptionDiv>
                    :
                    <OptionLink to='/signin'>
                        SIGN IN
                    </OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {
                cartHidden ?
                null
                :
                <CartDropdown />
            }
        </HeaderContainer>
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

const mapDispatchToProps = (dispatch) => {
    return {
        signOutStart: () => dispatch(signOutStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);