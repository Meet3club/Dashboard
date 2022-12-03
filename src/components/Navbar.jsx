import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/meeting" activeStyle>
                        Meeting
                    </NavLink>

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
