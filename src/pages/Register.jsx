import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";
import UserContext from "../userContext";

export default function Register() {
    const { user } = useContext(UserContext);
    // console.log(user);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // form validation
        if (
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            mobileNo !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword &&
            mobileNo.length === 11
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(mobileNo);
        console.log(password);
        console.log(confirmPassword);

        fetch("https://capstone2-ecommerce-api-nizn.onrender.com/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Registration Successful!",
                        text: data.message,
                    });

                    navigate("/login");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Registration Failed.",
                        text: data.message,
                    });
                }
            });
    }

    useEffect(() => {
        if (user.id) {
            redirect("/");
        }
    }, []);

    return (
        <>
            <Row className="justify-content-center">
                <Col xs md="6">
                    <h1 className="my-5 text-center">Register</h1>
                    <Form onSubmit={(e) => registerUser(e)}>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                placeholder="Enter First Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                placeholder="Enter Last Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
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
                        <Form.Group>
                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control
                                type="number"
                                value={mobileNo}
                                onChange={(e) => {
                                    setMobileNo(e.target.value);
                                }}
                                placeholder="Enter 11 Digit Mobile No"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
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
                        <Form.Group>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                placeholder="Confirm Password"
                                required
                            />
                        </Form.Group>
                        {isActive ? (
                            <Button variant="dark" type="submit">
                                {" "}
                                Submit
                            </Button>
                        ) : (
                            <Button variant="dark" disabled>
                                {" "}
                                Submit
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </>
    );
}

// firstName : req.body.firstName,
// 		lastName : req.body.lastName,
// 		mobileNo : req.body.mobileNo,
// 		email : req.body.email,
// 		password : hashedPW
