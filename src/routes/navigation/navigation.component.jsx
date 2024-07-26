import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'
import { selecCurrentUser } from "../../store/user/user.selector"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { useSelector } from "react-redux"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { useDispatch } from "react-redux"
import { signOutStart } from "../../store/user/user.action"
const Navigation = ()=> {

    const dispatch = useDispatch()
    const currentUser = useSelector(selecCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutUser = () => dispatch(signOutStart())

    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo"></CrwnLogo>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {currentUser?<Link onClick={signOutUser} className="nav-link">
                    SIGN OUT
                </Link>:<Link className="nav-link" to='/auth'>
                    SIGN IN
                </Link>}
                <CartIcon> </CartIcon>

             </div>
            {isCartOpen && <CartDropdown />}

            </div>
          <Outlet/>
      </Fragment>
    )
}

export default Navigation