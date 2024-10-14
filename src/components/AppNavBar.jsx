import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { list } from "cart-localstorage";
import UserContext from "../userContext";

export default function AppNavBar() {
    const { user } = useContext(UserContext);
    // console.log(user);

    return (
        <Navbar bg="warning" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <i class="fab fa-shopware"></i> Checkpoint
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m1-auto">
                    <Nav.Link as={Link} to="/">
                        <i class="fas fa-store"></i> Home
                    </Nav.Link>
                    {user.id ? (
                        user.isAdmin ? (
                            <>
                                <NavDropdown title="Products">
                                    <NavDropdown.Item as={Link} to="/products">
                                        <i class="fas fa-tags"></i> View
                                        Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/addproduct"
                                    >
                                        <i class="fas fa-folder-plus"></i> Add
                                        Product
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/orders">
                                    <i class="fas fa-file-invoice"></i> Orders
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/products">
                                    <i class="fas fa-tags"></i> Products
                                </Nav.Link>
                                <Nav.Link as={Link} to="/orders">
                                    <i class="fas fa-file-invoice"></i> My
                                    Orders
                                </Nav.Link>
                                <Nav.Link as={Link} to="/cart">
                                    <i class="fas fa-shopping-cart"></i> My Cart{" "}
                                    <Badge pill variant="danger">
                                        {list().length}
                                    </Badge>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </Nav.Link>
                            </>
                        )
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/products">
                                <i class="fas fa-tags"></i> Products
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                <i class="fas fa-user-plus"></i> Register
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                <i class="fas fa-sign-in-alt"></i> Log In
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
