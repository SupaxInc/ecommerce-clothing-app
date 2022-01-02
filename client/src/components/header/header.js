import React from 'react';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartHidden, selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { saveCartStart } from '../../redux/cart/cart.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles';

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
    const cartHidden = useSelector(selectCartHidden);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

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
                    <OptionDiv onClick={() => dispatch(saveCartStart(cartItems))}>
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

export default Header;