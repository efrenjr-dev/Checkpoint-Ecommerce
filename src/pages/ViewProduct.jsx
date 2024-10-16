import { useState, useEffect, useContext } from "react";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../userContext";
import { add, total, list } from "cart-localstorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function ViewProduct() {
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    // console.log(user);
    const navigate = useNavigate();

    const [productQuantity, setProductQuantity] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const [productDetails, setProductDetails] = useState({
        id: null,
        productName: null,
        description: null,
        price: 0,
    });

    /*const Toast = Swal.mixin({
		  toast: true,
		  position: 'top-end',
		  showConfirmButton: false,
		  timer: 3000,
		  timerProgressBar: true,
		  didOpen: (toast) => {
		    toast.addEventListener('mouseenter', Swal.stopTimer)
		    toast.addEventListener('mouseleave', Swal.resumeTimer)
		  }
		})*/

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + `/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    Swal.fire({
                        icon: "error",
                        title: "Product Unavailable",
                        text: data.message,
                    });
                } else {
                    setProductDetails({
                        id: data._id,
                        productName: data.productName,
                        description: data.description,
                        price: data.price,
                    });
                }
            });
    }, []);

    useEffect(() => {
        setSubtotal(productDetails.price * productQuantity);

        if (productQuantity < 0) {
            setProductQuantity(0);
            setIsActive(false);
        } else if (productQuantity > 0) {
            setIsActive(true);
        }
    }, [productQuantity]);

    function addToCart(e) {
        e.preventDefault();

        console.log(productDetails);

        // add to cart-localstorage
        add(productDetails, parseInt(productQuantity));

        // display total amount of cart-localstorage
        console.log(`-total ${total()}`);

        /*Toast.fire({
		  icon: 'success',
		  title: 'Item has been added to cart'
		})*/

        Swal.fire({
            icon: "success",
            title: "Item has been added to cart",
            text: `${productDetails.productName} x (${productQuantity})`,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonColor: "#3085d6",
            confirmButtonText: '<i class="fas fa-shopping-cart"></i> View cart',
            denyButtonText: `<i class="fas fa-tags"></i> Browse products`,
            cancelButtonText: '<i class="fas fa-undo-alt"></i>',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Swal.fire('Saved!', '', 'success')
                navigate("/cart");
            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
                navigate("/products");
            }
        });
        // destroy();

        // display content of cart-localstorage
        setProductQuantity(0);
        console.log(list());
    }

    // function updateProduct(productId) {
    // 	console.log('-updateProduct fn')
    // 	// console.log(productId);
    // 	history.push(`/updateproduct/${productId}`);
    // }

    return (
        <Row className="mt-5 justify-content-center d-flex align-items-center">
            <Col xs={12} sm={6} lg={4}>
                <Card>
                    <Card.Img
                        variant="top"
                        src="https://via.placeholder.com/300x200/000000/FFFFFF?text=Image"
                    />
                    <Card.Body className="text-center">
                        <Card.Title>{productDetails.productName}</Card.Title>
                        {/*<Card.Subtitle>Description:</Card.Subtitle>*/}
                        <Card.Subtitle>
                            {productDetails.description}
                        </Card.Subtitle>
                        {/*<Card.Subtitle>Price (PHP):</Card.Subtitle>*/}
                        <Card.Text>
                            PHP {productDetails.price.toFixed(2)}
                        </Card.Text>
                        {user.isAdmin === false ? (
                            <Form onSubmit={(e) => addToCart(e)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productQuantity}
                                        onChange={(e) => {
                                            setProductQuantity(e.target.value);
                                        }}
                                        placeholder="0"
                                        required
                                    />
                                </Form.Group>
                                <Card.Subtitle>Subtotal (PHP):</Card.Subtitle>
                                <Card.Text>{subtotal.toFixed(2)}</Card.Text>
                                {isActive ? (
                                    <Button
                                        variant="warning"
                                        className="btn"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon
                                            className={styles.fontawesomeicon}
                                            icon={faCartPlus}
                                        />{" "}
                                        Add to cart
                                    </Button>
                                ) : (
                                    <Button
                                        variant="warning"
                                        className="btn"
                                        disabled
                                    >
                                        <FontAwesomeIcon
                                            className={styles.fontawesomeicon}
                                            icon={faCartPlus}
                                        />{" "}
                                        Add to cart
                                    </Button>
                                )}
                            </Form>
                        ) : (
                            <>
                                <Link
                                    className="btn btn-outline-danger"
                                    to="/login"
                                >
                                    <FontAwesomeIcon
                                        className={styles.fontawesomeicon}
                                        icon={faSignInAlt}
                                    />
                                    Log in to add to cart
                                </Link>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
