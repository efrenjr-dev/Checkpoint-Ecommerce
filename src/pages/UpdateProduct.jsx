import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { redirect, useNavigate, useParams } from "react-router-dom";
import UserContext from "../userContext";

export default function UpdateProduct() {
    const { user } = useContext(UserContext);
    // console.log(user);

    const navigate = useNavigate();

    const productId = useParams().productId;
    // console.log(productId);

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

    useEffect(() => {
        if (!user.isAdmin) {
            redirect("/login");
        }
        fetch(
            `https://capstone2-ecommerce-api-nizn.onrender.com/products/${productId}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    Swal.fire({
                        icon: "error",
                        title: "Product Unavailable",
                        text: data.message,
                    });
                } else {
                    setProductName(data.productName);
                    setDescription(data.description);
                    setPrice(data.price);
                }
            });
    }, []);

    function updateProduct(e) {
        e.preventDefault();

        console.log(productName);
        console.log(description);
        console.log(price);

        console.log(productId);

        fetch(
            `https://capstone2-ecommerce-api-nizn.onrender.com/products/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    productName: productName,
                    description: description,
                    price: price,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Changes Saved!",
                        text: data.message,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText:
                            '<i class="fas fa-tags"></i> Browse products',
                        cancelButtonText: '<i class="fas fa-undo-alt"></i>',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            // Swal.fire('Saved!', '', 'success')
                            navigate("/products");
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Unable to Save Changes.",
                        text: data.message,
                    });
                }
            });
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col xs md="6">
                    <h1 className="my-5 text-center">Update Product</h1>
                    <Form onSubmit={(e) => updateProduct(e)}>
                        <Form.Group>
                            <Form.Label>Product Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={productName}
                                onChange={(e) => {
                                    setProductName(e.target.value);
                                }}
                                placeholder={productName}
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
                                placeholder={description}
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
                                placeholder={price}
                                required
                            />
                        </Form.Group>
                        {isActive ? (
                            <Button variant="warning" type="submit">
                                Save
                            </Button>
                        ) : (
                            <Button variant="warning" disabled>
                                Save
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </>
    );
}
