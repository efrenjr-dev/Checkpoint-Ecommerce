import { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import { Table, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [userOrders, setUserOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        if (!user.isAdmin) {
            setLoading(true);
            fetch(import.meta.env.VITE_API_URL + "/users/myOrders", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    // console.log(data);

                    setUserOrders(
                        data.map((order) => {
                            // console.log(order);

                            let date = new Date(order.dateCreated);
                            // console.log(date);
                            let strDate =
                                +date.getDate() +
                                "/" +
                                (date.getMonth() + 1) +
                                "/" +
                                date.getFullYear() +
                                " " +
                                date.getHours() +
                                ":" +
                                date.getMinutes() +
                                ":" +
                                date.getSeconds();
                            // console.log(date);

                            return (
                                <tr key={order._id}>
                                    <td className="text-center">{strDate}</td>
                                    <td className="text-center">
                                        {order.products.length}
                                    </td>
                                    <td className="text-right">
                                        {order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-secondary"
                                            className="mx-2 btn-sm"
                                            onClick={() => {
                                                viewOrder(order._id);
                                            }}
                                        >
                                            {" "}
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    );
                });
        }
    }, []);

    useEffect(() => {
        if (user.isAdmin) {
            setLoading(true);

            fetch(import.meta.env.VITE_API_URL + "/users/allOrders", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    // console.log(data);

                    setAllOrders(
                        data.map((order) => {
                            // console.log(order);

                            let date = new Date(order.dateCreated);
                            // console.log(date);
                            let strDate =
                                +date.getDate() +
                                "/" +
                                (date.getMonth() + 1) +
                                "/" +
                                date.getFullYear() +
                                " " +
                                date.getHours() +
                                ":" +
                                date.getMinutes() +
                                ":" +
                                date.getSeconds();

                            return (
                                <tr key={order._id}>
                                    <td className="text-center">{strDate}</td>
                                    <td className="text-center">{order._id}</td>
                                    <td className="text-center">
                                        {order.products.length}
                                    </td>
                                    <td className="text-right">
                                        {order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="text-right">
                                        {order.userId}
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-secondary"
                                            className="mx-2 btn-sm"
                                            onClick={() => {
                                                viewOrder(order._id);
                                            }}
                                        >
                                            {" "}
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    );
                });
        }
    }, [user]);

    function viewOrder(orderId) {
        // console.log(orderId);
        navigate(`/order/${orderId}`);
    }

    return loading ? (
        <Row className="text-center mt-5">
            <Col>
                <Spinner animation="border" />
            </Col>
        </Row>
    ) : user.isAdmin ? (
        <>
            <h1 className="my-5 text-center">All Orders</h1>
            <Table responsive="md" striped hover>
                <thead>
                    <tr>
                        <th className="text-center">Date</th>
                        <th className="text-center">Order ID</th>
                        <th className="text-center">No. of Products</th>
                        <th className="text-right">Total Amount (PHP)</th>
                        <th className="text-center">User ID</th>
                        <th className="text-center text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>{allOrders}</tbody>
            </Table>
        </>
    ) : (
        <>
            <h1 className="my-5 text-center">My Orders</h1>
            <Table responsive="md" striped hover>
                <thead>
                    <tr>
                        <th className="text-center">Date</th>
                        <th className="text-center">No. of Products</th>
                        <th className="text-right">Total Amount (PHP)</th>
                        <th className="text-center text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>{userOrders}</tbody>
            </Table>
        </>
    );
}
