import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAlert, useGlobalState } from '../store'
import { logout } from '../firebase'
import { connectWallet } from '../shared/boxify'
import Navbar from '@material-tailwind/react/Navbar'
import NavbarContainer from '@material-tailwind/react/NavbarContainer'
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper'
import NavbarBrand from '@material-tailwind/react/NavbarBrand'
import NavbarToggler from '@material-tailwind/react/NavbarToggler'
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse'
import Nav from '@material-tailwind/react/Nav'
import NavItem from '@material-tailwind/react/NavItem'

const Header = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const [cart] = useGlobalState('cart')
  const [isLoggedIn] = useGlobalState('isLoggedIn')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout().then((res) => {
      if (res) {
        setAlert('Logged out successfully')
        navigate('/signin')
      }
    })
  }

  return (
    <Navbar color="red" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <Link to="/">
            <NavbarBrand>Boxify</NavbarBrand>
          </Link>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="white"
          />
        </NavbarWrapper>

        <NavbarWrapper>
          <navItem ripple="light">
            <img src={require("./Saudi.png")} alt="saudi" width="54" height="54" />
          </navItem>
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          {isLoggedIn ? (
            <Nav leftSide>
              <NavItem ripple="light">
                <Link to="/product/add">Add Product</Link>
              </NavItem>
            </Nav>
          ) : (
            <></>
          )}
          <Nav rightSide>
            {isLoggedIn ? (
              <>
                {connectedAccount ? null : (
                  <NavItem
                    onClick={connectWallet}
                    active="light"
                    ripple="light"
                  >
                    <span className="cursor-pointer">Connect Wallet</span>
                  </NavItem>
                )}
                <NavItem onClick={handleSignOut} ripple="light">
                  <span className="cursor-pointer">Logout</span>
                </NavItem>

                <NavItem ripple="light">
                  <Link to="/checkcontract">check contract
                  </Link>
                </NavItem>

                <NavItem ripple="light">
                  <Link to="/cart">{cart.length} Cart</Link>
                </NavItem>
              </>
            ) : (
              <NavItem ripple="light">
                <Link to="/signin" className="cursor-pointer">
                  Login
                </Link>
              </NavItem>
            )}
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  )
}

export default Header
