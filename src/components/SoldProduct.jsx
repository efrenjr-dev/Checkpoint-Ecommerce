import {Card, Image, Col} from 'react-bootstrap';

export default function SoldProduct({productProp}) {

	// console.log(productProp);

		return (
			<>
			<Col className="col-xs-1 col-sm-8 col-md-5">
				<Card>
					<Card.Body>
						<Card.Title>{productProp.productName}</Card.Title>
						<Card.Subtitle>Quantity:</Card.Subtitle>
						<Card.Text>{productProp.quantity}</Card.Text>
						{/*<Card.Subtitle>Price (PHP):</Card.Subtitle>*/}
						<Card.Text>PHP {productProp.priceSold.toFixed(2)}</Card.Text>
					</Card.Body>
					<Card.Footer>Subtotal: PHP {(productProp.priceSold*productProp.quantity).toFixed(2)}</Card.Footer>
				</Card>
			</Col>
			<Col className="col-xs-1 col-sm-4 col-md-3">
				<Image src="https://via.placeholder.com/300x200/000000/FFFFFF?text=Image" rounded fluid />
			</Col>
			</>

		)
}