/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Checkout.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputGroup, FormControl, Button } from "react-bootstrap";


function Checkout(props) {
    
    //media
    const [media, setMedia] = useState('/media/')

    // Checkout   
    const [basket, setBasket] = useState(localStorage.getItem('basket'));
    const [total, setTotal] = useState(0);

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
                    <Col xs={6} className='text-secondary'>Unit Price: $ {element.price}</Col>
                    <Col xs={6}></Col>
                    <Col xs={5} className='text-secondary text-start'>Subtotal</Col>
                    <Col xs={7} className="text-end">$ {element.price*element.quantity}</Col>
                </Row>                          
    )

    const handleTotal = () => {
        let total = 0
        let items = JSON.parse(basket);
        let i;
        // for(i=0 ; i<=items.length; i++){
        //     console.log(items[i]['price'])
        //     // total = total + items[i].price * items[i].quantity
        // }
        items.forEach(element => {
            total = total + element.price * element.quantity
            console.log(element)
        })
        return total
    }
    

    return (
        <div className="checkout">
            <Row className="m-0">
                <Col xs={12} md={7} className='order-1'>
                    <form className="p-2 mt-3 checkout-form w-50 mx-auto">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-user"></i></InputGroup.Text>
                            <FormControl
                            placeholder="First Name"
                            type="text"
                            aria-label="firstname"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-user"></i></InputGroup.Text>
                            <FormControl
                            placeholder="Last Name"
                            type="text"
                            aria-label="lastname"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-at"></i></InputGroup.Text>
                            <FormControl
                            placeholder="Email"
                            type="email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-address-book"></i></InputGroup.Text>
                            <FormControl
                            placeholder="Address Line 1"
                            type="text"
                            aria-label="Address_one"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-address-book"></i></InputGroup.Text>
                            <FormControl
                            placeholder="Address Line 2"
                            type="text"
                            aria-label="Address_two"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-phone"></i></InputGroup.Text>
                            <FormControl
                            placeholder="Phone Number"
                            type="tel"
                            aria-label="Phone_number"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <Button variant="dark rounded-0 w-100 mb-2 order" type="submit" >Process Order</Button>  
                    </form>
                </Col>
                <Col xs={12} md={5} className="p-2 p-sm-3">
                    <Row className="m-0">
                        <Col xs={12}>{basketView}</Col>
                        <Col xs={12} className="border-bottom border-secondary mb-2"></Col>
                        <Col xs={7} className="h6">Total Price:</Col>
                        <Col className="text-end pe-4 font-bold h6" xs={5}>$ {handleTotal()}</Col>
                    </Row>
                </Col>
            </Row>                  
        </div>
    );
}

export default Checkout;