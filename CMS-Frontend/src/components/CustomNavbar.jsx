import React, {useState} from 'react'
import { NavLink as ReactLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='info' dark expand='md' fixed=''>
        <NavbarBrand href="/">Cafe Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to='/'>Home</NavLink>
            </NavItem>
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
          <NavbarText>Forgot Password</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar