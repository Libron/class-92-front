import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavbarBrand
} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import UserMenu from "./Menus/UserMenu";

const Toolbar = ({user, logout}) => {
  return (
    <Navbar color="dark" dark expand="md" style={{marginBottom: '50px'}}>
        <Container>
            <NavbarBrand tag={RouterNavLink} to="/">Chat Box</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <UserMenu user={user} logout={logout} />
            </Nav>
        </Container>
    </Navbar>
  );
};

export default Toolbar;