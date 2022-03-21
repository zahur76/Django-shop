/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Checkout.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Checkout(props) {
    
    //media
    const [media, setMedia] = useState('/media/')

    // Checkout   
    const [basket, setBasket] = useState(localStorage.getItem('basket'));

    const [allProducts, setAllProducts] = useState(null);

    useEffect(() => {
        fetch("api/all_products").then((res) => res.json())
        .then((data) => [setAllProducts(data), console.log(data)]).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const mediaFile = (id) => 
        (allProducts || []).map((element, index)=>
            element.id===id ? <img className="checkout-image m-2" src={process.env.PUBLIC_URL + media + element.image} alt={element.name} /> : console.log('')
        )
            

    const basketView = (JSON.parse(basket) || []).map((element, index)=>
                <Row className="m-0 pb-2" key={index}>
                    <Col xs={12} className='border-bottom text-basket text-dark'>{index+1}. {element.name}</Col>
                    <Col xs={12}>{mediaFile(element.id)}</Col>
                    <Col xs={5} className='text-secondary'>Quantity: {element.quantity}</Col>                    
                    <Col xs={5} className='text-secondary'>Size: {element.size}</Col>
                    <Col xs={2}></Col>
                    <Col xs={5} className='text-secondary'>Unit Price:{element.price}</Col>
                    <Col xs={7}></Col>
                    <Col xs={5} className='text-secondary text-start'>Subtotal</Col>
                    <Col xs={7} className="text-end">{element.price*element.quantity}</Col>
                </Row>                          
    )

    return (
        <div className="checkout">
            <Row className="m-0">
                <Col xs={12} md={7} className='order-1'>Form</Col>
                <Col xs={12} md={5} className="p-2 p-sm-3">
                    <Row className="m-0">
                        <Col xs={12}>{basketView}</Col>
                        <Col xs={12} className="border-bottom border-secondary"></Col>
                    </Row>
                </Col>
            </Row>                  
        </div>
    );
}

export default Checkout;