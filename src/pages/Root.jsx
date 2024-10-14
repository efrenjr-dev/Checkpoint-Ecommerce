import { Outlet } from "react-router-dom";
import { UserProvider } from "../userContext";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import AppNavBar from "../components/AppNavBar";

export default function Root() {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null,
    });

    useEffect(() => {
        fetch(
            "https://capstone2-ecommerce-api-nizn.onrender.com/users/getUserDetails",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin,
                });
            });
    }, []);

    console.log(user);

    const unsetUser = () => {
        localStorage.clear();
    };

    return (
        <>
            <UserProvider value={{ user, setUser, unsetUser }}>
                <AppNavBar />
                <Container>
                    <Outlet />
                </Container>
            </UserProvider>
        </>
    );
}
