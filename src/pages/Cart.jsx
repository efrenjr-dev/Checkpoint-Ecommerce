import { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import { Table, Button, Spinner, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import {
    quantity,
    remove,
    destroy,
    list,
    subtotal,
    total,
} from "cart-localstorage";
import { redirect, useNavigate } from "react-router-dom";

export default function Cart() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [update, setUpdate] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user.isAdmin) {
            redirect("/login");
        }
    }, []);

    useEffect(() => {
        // console.log(list());

        if (list().length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Your shopping cart is empty!",
                text: "Please browse our products",
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText:
                    '<i class="fas fa-tags"></i> Browse Products',
                denyButtonText: `Browse Products`,
                cancelButtonText: '<i class="fas fa-undo-alt"></i>',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    // Swal.fire('Saved!', '', 'success')
                    navigate("/products");
                } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info')
                    navigate("/products");
                }
            });
        } else {
            setCart(
                list().map((product) => {
                    // console.log(product)

                    return (
                        <tr key={product.id}>
                            <td>{product.productName}</td>
                            <td className="text-right">
                                {product.price.toFixed(2)}
                            </td>
                            <td className="text-center">{product.quantity}</td>
                            <td className="text-left col-3">
                                <Button
                                    variant="outline-secondary"
                                    className="mx-2"
                                    onClick={() => {
                                        addOne(product.id);
                                    }}
                                >
                                    <i class="fas fa-plus"></i>
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="mx-2"
                                    onClick={() => {
                                        removeOne(product.id, product.quantity);
                                    }}
                                >
                                    <i class="fas fa-minus"></i>
                                </Button>
                            </td>
                            <td className="text-right">
                                {subtotal(product).toFixed(2)}
                            </td>
                            <td className="text-center">
                                <Button
                                    variant="outline-secondary"
                                    className="mx-2"
                                    onClick={() => {
                                        deleteItem(
                                            product.id,
                                            product.productName
                                        );
                                    }}
                                >
                                    {/*<i class="fas fa-cart-arrow-down"></i>*/}
                                    <i class="far fa-trash-alt"></i>
                                </Button>
                            </td>
                        </tr>
                    );
                })
            );
        }
    }, [update]);

    function addOne(productId) {
        quantity(productId, 1);
        setUpdate(update + 1);
    }

    function removeOne(productId, productQuantity) {
        if (productQuantity > 1) {
            quantity(productId, -1);
            setUpdate(update + 1);
        }
    }

    function deleteItem(id, name) {
        Swal.fire({
            title: "Remove this item from cart?",
            text: `${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            // cancelButtonColor: '#3085d6',
            confirmButtonText:
                '<i class="far fa-trash-alt"></i> Yes, remove item',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("-delete confirmed");
                remove(id);
                setUpdate(update + 1);
            }
        });
    }

    function checkout() {
        console.log("-checkout fn");
        // console.log(list());
        // console.log(total());

        // console.log(data);

        Swal.fire({
            title: "Proceed to checkout?",
            text: `Total Amount: PHP ${total().toFixed(2)}`,
            icon: "question",
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: '<i class="far fa-credit-card"></i> Yes!',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("-confirmed");
                setLoading(true);

                fetch(
                    "https://capstone2-ecommerce-api-nizn.onrender.com/users/createOrder",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            products: list(),
                            totalAmount: total(),
                        }),
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("-createOrder");
                        setLoading(false);

                        if (data.status) {
                            Swal.fire({
                                icon: "success",
                                title: "Checkout Successful!",
                                text: data.message,
                            });

                            destroy();
                            navigate("/orders");
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Checkout Failed.",
                                text: data.message,
                            });
                        }
                    });
            }
        });
    }

    return loading ? (
        <Row className="text-center mt-5">
            <Col>
                <Spinner animation="border" />
            </Col>
        </Row>
    ) : (
        <>
            <h1 className="my-5 text-center">Shopping Cart</h1>
            {list().length > 0 ? (
                <>
                    <Table responsive striped hover>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Price (PHP)</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-left px-4 text-secondary">
                                    Add/Remove
                                </th>
                                <th className="text-center">Subtotal (PHP)</th>
                                <th className="text-center text-secondary">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart}
                            <tr>
                                <th className="text-center"></th>
                                <th className="text-center"></th>
                                <th className="text-center"></th>
                                <th className="text-left px-4 text-secondary"></th>
                                <th className="text-right">
                                    Total: PHP {total().toFixed(2)}
                                </th>
                                <th className="text-center text-secondary"></th>
                            </tr>
                        </tbody>
                    </Table>
                    <Button
                        variant="outline-dark"
                        className="btn text-right"
                        onClick={() => {
                            checkout();
                        }}
                    >
                        <i class="fas fa-sign-in-alt"></i> Check Out
                    </Button>
                </>
            ) : (
                <h3 className="text-center">
                    <i class="far fa-frown"></i>
                </h3>
            )}
        </>
    );
}
