import { useState, useEffect } from "react";
import Product from "../components/Product";
// import UserContext from '../userContext'
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardCheck,
    faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";

export default function Home() {
    // const {user} = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const [activeProducts, setActiveProducts] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetch(import.meta.env.VITE_API_URL + "/products/")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);

                setActiveProducts(
                    data.map((product) => {
                        return (
                            <Col
                                className="d-flex align-items-stretch"
                                key={product._id}
                            >
                                <Product productProp={product} />
                            </Col>
                        );
                    })
                );
            });
    }, []);

    return loading ? (
        <Row className="text-center mt-5">
            <Col>
                <Spinner animation="border" />
            </Col>
        </Row>
    ) : (
        <Container>
            <h1 className="my-5 text-center brand">
                <FontAwesomeIcon
                    className={styles.fontawesomeicon}
                    icon={faClipboardCheck}
                />
                Checkpoint
            </h1>
            <h2 className="my-5 text-center">Featured Products</h2>
            <Row xs={1} sm={2} lg={4}>
                {activeProducts}
            </Row>
        </Container>
    );
}
