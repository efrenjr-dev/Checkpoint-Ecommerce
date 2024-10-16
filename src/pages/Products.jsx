import { useState, useEffect, useContext } from "react";
import Product from "../components/Product";
import UserContext from "../userContext";
import { Container, Table, Button, Row, Col, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const { user } = useContext(UserContext);
    // console.log(user);
    const navigate = useNavigate();

    const [activeProducts, setActiveProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [update, setUpdate] = useState(0);
    const [loading, setLoading] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    /*let productProp = {
		productName: "Product Name",
		description: "Description of product on display",
		price: 9999
	}*/

    useEffect(() => {
        if (!user.isAdmin) {
            setLoading(true);
            fetch(import.meta.env.VITE_API_URL + "/products/")
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);

                    setActiveProducts(
                        data.map((product) => {
                            return (
                                <Col className="d-flex align-items-stretch">
                                    <Product
                                        key={product._id}
                                        productProp={product}
                                    />
                                </Col>
                            );
                        })
                    );
                });
        }
    }, []);

    useEffect(() => {
        if (user.isAdmin) {
            // console.log('-admin, view all products');
            setLoading(true);

            fetch(import.meta.env.VITE_API_URL + "/products/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    // console.log(data);

                    setAllProducts(
                        data.map((product) => {
                            // console.log(product);
                            return (
                                <tr key={product._id}>
                                    <td>{product.productName}</td>
                                    <td>{product.description}</td>
                                    <td className="text-right">
                                        {product.price.toFixed(2)}
                                    </td>
                                    <td>{product._id}</td>
                                    <td>{product.isActive ? "Yes" : "No"}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-dark"
                                            className="mx-2 btn-sm"
                                            onClick={() => {
                                                updateProduct(product._id);
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </td>
                                    <td className="text-center">
                                        {product.isActive ? (
                                            <Button
                                                variant="outline-danger"
                                                className="mx-2 btn-sm"
                                                onClick={() => {
                                                    disable(product._id);
                                                }}
                                            >
                                                Disable
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline-secondary"
                                                className="mx-2 btn-sm"
                                                onClick={() => {
                                                    enable(product._id);
                                                }}
                                            >
                                                Enable
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    );
                });
        }
    }, [user, update]);

    function updateProduct(productId) {
        console.log(productId);
        navigate(`/updateproduct/${productId}`);
    }

    function disable(productId) {
        console.log(`disable! ${productId}`);

        fetch(import.meta.env.VITE_API_URL + `/products/archive/${productId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.status === "success") {
                    /*Swal.fire({
					icon: "success",
					title: "Product Disabled",
					text: data.message
				})*/
                    Toast.fire({
                        icon: "warning",
                        title: "Product Disabled",
                        text: data.message,
                    });
                    setUpdate(update + 1);
                } else {
                    /*Swal.fire({
					icon: "error",
					title: "Unable to Disable",
					text: data.message
				})*/
                    Toast.fire({
                        icon: "error",
                        title: "Unable to Disable",
                        text: data.message,
                    });
                }
            });
    }

    function enable(productId) {
        console.log(`enable! ${productId}`);

        fetch(
            import.meta.env.VITE_API_URL + `/products/activate/${productId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.status === "success") {
                    /*Swal.fire({
					icon: "success",
					title: "Product Enabled",
					text: data.message
				})*/
                    Toast.fire({
                        icon: "success",
                        title: "Product Enabled",
                        text: data.message,
                    });
                    setUpdate(update + 1);
                } else {
                    /*Swal.fire({
					icon: "error",
					title: "Unable to Enable.",
					text: data.message
				})*/
                    Toast.fire({
                        icon: "error",
                        title: "Unable to Enable",
                        text: data.message,
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
        <Container>
            {user.isAdmin ? (
                <>
                    <h1 className="text-center my-5">Admin Dashboard</h1>
                    <Table responsive striped hover>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Description</th>
                                <th className="text-center">Price (PHP)</th>
                                <th className="text-center">Product ID</th>
                                <th className="text-center">Available?</th>
                                <th colSpan="2" className="text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>{allProducts}</tbody>
                    </Table>
                </>
            ) : (
                <>
                    <h1 className="my-5 text-center">Products</h1>
                    <Row xs={1} sm={2} lg={4}>
                        {activeProducts}
                    </Row>
                </>
            )}
        </Container>
    );
}
