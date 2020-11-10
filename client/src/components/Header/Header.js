import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Header = (props) => {

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"></NavbarBrand>
    
      </Navbar>
    </div>
  );
}

export default Header;