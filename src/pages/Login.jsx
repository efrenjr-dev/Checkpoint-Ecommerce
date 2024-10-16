import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../userContext";
import { redirect } from "react-router-dom";

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    // console.log(user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    useEffect(() => {
        email !== "" && password !== ""
            ? setIsActive(true)
            : setIsActive(false);
    }, [email, password]);

    useEffect(() => {
        if (user.id) {
            redirect("/");
        }
    }, [user]);

    function loginUser(e) {
        e.preventDefault();

        console.log(email);
        console.log(password);

        fetch(import.meta.env.VITE_API_URL + "/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log({ data });

                if (data.accessToken) {
                    // Swal.fire({
                    // 	icon: "success",
                    // 	title: "Login Successful!",
                    // 	text: `You have been logged in as ${email}!`
                    // })

                    Toast.fire({
                        icon: "success",
                        title: "Login Successful!",
                        text: `You have been logged in as ${email}!`,
                    });

                    localStorage.setItem("token", data.accessToken);

                    fetch(
                        import.meta.env.VITE_API_URL + "/users/getUserDetails",
                        {
                            headers: {
                                Authorization: `Bearer ${data.accessToken}`,
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
                            redirect("/");
                        });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed.",
                        text: data.message,
                    });
                }
            });
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col xs md="6">
                    <h1 className="my-5 text-center">Login</h1>
                    <Form onSubmit={(e) => loginUser(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="Enter Email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="Enter Password"
                                required
                            />
                        </Form.Group>
                        {isActive ? (
                            <Button variant="warning" type="submit">
                                Submit
                            </Button>
                        ) : (
                            <Button variant="warning" disabled>
                                Submit
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs md="6" className="mt-5">
                    <Tabs
                        defaultActiveKey="admin"
                        id="user-credentials"
                        className="mb-3"
                    >
                        <Tab eventKey="admin" title="Admin User">
                            <h5>Admin Credentials</h5>
                            <p>
                                Email: adminAPI@gmail.com
                                <br />
                                Password: adminAPI123
                            </p>
                        </Tab>
                        <Tab eventKey="nonadmin" title="Non-Admin User">
                            <h5>Non-Admin Credentials</h5>
                            <p>
                                Email: nonadminAPI@gmail.com
                                <br />
                                Password: nonadminAPI
                            </p>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>
    );
}
