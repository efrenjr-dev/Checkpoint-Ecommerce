import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Product({productProp}) {

	// console.log(productProp);

		return (

			<Card className="mb-5" bg="light" border="light">
				<Card.Img variant="top" src="https://via.placeholder.com/300x200/000000/FFFFFF?text=Image" />
				<Card.Body>
					<Card.Title>{productProp.productName}</Card.Title>
					{/*<Card.Subtitle>Description:</Card.Subtitle>*/}
					<Card.Text>{productProp.description}</Card.Text>
					{/*<Card.Subtitle>Price (PHP):</Card.Subtitle>*/}
					<Card.Text>PHP {productProp.price.toFixed(2)}</Card.Text>
					<Link className="btn btn-outline-secondary btn-sm align-bottom" to={`/product/${productProp._id}`}>View details</Link>
				</Card.Body>
			</Card>

		)
}