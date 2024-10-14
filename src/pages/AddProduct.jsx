import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";
import UserContext from "../userContext";

export default function AddProduct() {
    const { user } = useContext(UserContext);
    console.log(user);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // form validation
        if (
            productName !== "" &&
            description !== "" &&
            price !== 0 &&
            price > 0
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [productName, description, price]);

    function addProduct(e) {
        e.preventDefault();

        console.log(productName);
        console.log(description);
        console.log(price);

        fetch("https://capstone2-ecommerce-api-nizn.onrender.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                productName: productName,
                description: description,
                price: price,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Product Saved!",
                        text: data.message,
                    });

                    setProductName("");
                    setDescription("");
                    setPrice("");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Unable to Add Product.",
                        text: data.message,
                    });
                }
            });
    }

    useEffect(() => {
        if (!user.isAdmin) {
            redirect("/login");
        }
    }, []);

    return (
        <>
            <Row className="justify-content-center">
                <Col xs md="6">
                    <h1 className="my-5 text-center">Add Product</h1>
                    <Form onSubmit={(e) => addProduct(e)}>
                        <Form.Group>
                            <Form.Label>Product Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={productName}
                                onChange={(e) => {
                                    setProductName(e.target.value);
                                }}
                                placeholder="Enter Product Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                placeholder="Enter Product Description"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price (PHP):</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                placeholder="Enter Product Price"
                                required
                            />
                        </Form.Group>
                        {isActive ? (
                            <Button variant="warning" type="submit">
                                {" "}
                                Submit
                            </Button>
                        ) : (
                            <Button variant="warning" disabled>
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
