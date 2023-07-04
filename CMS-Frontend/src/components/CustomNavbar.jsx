import React, {useEffect, useState} from 'react'
import { NavLink as ReactLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const[login,setLogin] = useState(false);

  const[user,setUser] = useState(undefined);

  useEffect(()=>{
    setLogin(isLoggedIn);
    setUser(getCurrentUserDetail())
    console.log(user)
  },[login])
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='info' dark expand='md' fixed='' className='px-5'>
        <NavbarBrand href="/">Cafe Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            
          </Nav>
          <Nav navbar>
            {
              login && (
                <>
                  <NavItem>
                    <NavLink>
                      Logout
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <div>{user.email}</div>
                    </NavLink>
                  </NavItem>
                </>
              )
            }
            <NavItem>
              <NavLink tag={ReactLink} to='/login'>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to='/signup'>
                Signup
              </NavLink>
            </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar