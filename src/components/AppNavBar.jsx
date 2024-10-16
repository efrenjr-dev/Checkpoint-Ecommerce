import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { list } from "cart-localstorage";
import UserContext from "../userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AppNavBar.module.css";
import {
    faClipboardCheck,
    faStore,
    faTags,
    faFolderPlus,
    faFileInvoice,
    faSignOutAlt,
    faShoppingCart,
    faUserPlus,
    faSignInAlt,
    faTag,
} from "@fortawesome/free-solid-svg-icons";

export default function AppNavBar() {
    const { user } = useContext(UserContext);
    // console.log(user);

    return (
        <Navbar bg="warning" expand="lg">
            <Navbar.Brand as={Link} to="/" className={styles.brand}>
                <FontAwesomeIcon
                    className={styles.fontawesomeicon}
                    icon={faClipboardCheck}
                />
                Checkpoint
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">
                        <FontAwesomeIcon
                            className={styles.fontawesomeicon}
                            icon={faStore}
                        />
                        Home
                    </Nav.Link>
                    {user.id ? (
                        user.isAdmin ? (
                            <>
                                <NavDropdown title="Products">
                                    <NavDropdown.Item as={Link} to="/products">
                                        <FontAwesomeIcon
                                            className={styles.fontawesomeicon}
                                            icon={faTags}
                                        />
                                        View Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/addproduct"
                                    >
                                        <FontAwesomeIcon
                                            className={styles.fontawesomeicon}
                                            icon={faFolderPlus}
                                        />
                                        Add Product
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/orders">
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faFileInvoice}
                                    />
                                    Orders
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faSignOutAlt}
                                    />
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/products">
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faTags}
                                    />
                                    Products
                                </Nav.Link>
                                <Nav.Link as={Link} to="/orders">
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faFileInvoice}
                                    />
                                    My Orders
                                </Nav.Link>
                                <Nav.Link as={Link} to="/cart">
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faShoppingCart}
                                    />
                                    My Cart{" "}
                                    <Badge pill variant="danger">
                                        {list().length}
                                    </Badge>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faSignOutAlt}
                                    />
                                    Logout
                                </Nav.Link>
                            </>
                        )
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/products">
                                <FontAwesomeIcon
                                    className={styles.fontawesomeicon}
                                    icon={faTags}
                                />
                                Products
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                <FontAwesomeIcon
                                    className={styles.fontawesomeicon}
                                    icon={faUserPlus}
                                />
                                Register
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                <FontAwesomeIcon
                                    className={styles.fontawesomeicon}
                                    icon={faSignInAlt}
                                />
                                Log In
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
