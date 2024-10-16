import { useState, useEffect } from "react";
import SoldProduct from "../components/SoldProduct";
// import UserContext from '../userContext'
import { Card, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

export default function ViewOrder() {
    const orderId = useParams().orderId;
    console.log(orderId);

    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    // const [update,setUpdate] = useState(0);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + `/users/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((foundOrder) => {
                console.log("-foundOrder");
                setOrder(foundOrder);
                // console.log(order);

                setProducts(
                    foundOrder.products.map((product) => {
                        console.log(product);
                        return (
                            <Row className="justify-content-center d-flex align-items-center mb-5">
                                <SoldProduct
                                    key={product._id}
                                    productProp={product}
                                />
                            </Row>
                        );
                    })
                );
            });
    }, [order, products]);

    return products.length > 0 ? (
        <>
            <h3 className="my-5 text-center">Order #{orderId}</h3>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="mb-5" border="dark" bg="light">
                        <Card.Body>
                            <Card.Subtitle>Date:</Card.Subtitle>
                            <Card.Text>{order.dateCreated}:</Card.Text>
                            <Card.Subtitle>Total Amount (PHP):</Card.Subtitle>
                            <Card.Text>{order.totalAmount}</Card.Text>
                            <Card.Subtitle>User ID:</Card.Subtitle>
                            <Card.Text>{order.userId}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {products}
        </>
    ) : (
        <h3 className="text-center py-5">
            <FontAwesomeIcon icon={faFrown} />
            Order not found.
        </h3>
    );
}
