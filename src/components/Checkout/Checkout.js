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
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [address_one, setAddress_one] = useState(null);
    const [address_two, setAddress_two] = useState(null);
    const [phone_number, setPhone_Number] = useState(null);

    const [allProducts, setAllProducts] = useState(null);

    useEffect(() => {
        fetch("api/all_products").then((res) => res.json())
        .then((data) => [setAllProducts(data), console.log(data)]).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // flash messages
    const [flash, flashMessages] = useState(null)

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
        // for(i=0 ; i<=items.length; i++){
        //     console.log(items[i]['price'])
        //     // total = total + items[i].price * items[i].quantity
        // }
        items.forEach(element => {
            total = total + element.price * element.quantity
        })
        return total
    }
    
    const handleFirstname=(event)=>{
        setFirstname(event.target.value)
    }
    const handleLastname=(event)=>{
        setLastname(event.target.value)
    }
    const handleAddress_one=(event)=>{
        setAddress_one(event.target.value)
    }    
    const handleAddress_two=(event)=>{
        setAddress_two(event.target.value)
    }
    const handleLEmail=(event)=>{
        setEmail(event.target.value)
    }
    const handlePhone_number=(event)=>{
        setPhone_Number(event.target.value)
    }
    
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const handleProductSubmit = (e) => {
        e.preventDefault()
    
        let formData = new FormData()
        formData.append('first_name', firstname)
        formData.append('last_name', lastname)
        formData.append('email', email)
        formData.append('address_one', address_one)
        formData.append('address_two', address_two)
        formData.append('phone_number', phone_number)
        console.log(formData)

        if(!firstname){
            flashMessages('First name cannot be empty')
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        }else if(!lastname){
            flashMessages('Last name cannot be empty')
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        }else if(!address_one){
            flashMessages('Address 1 cannot be empty')
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        }else if(!address_two){
            flashMessages('Address 2 cannot be empty')
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        }else if(!email){
            flashMessages('Email cannot be empty')
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        }else if(!phone_number){
            flashMessages('Phone Number cannot be empty')
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        }else{
            var csrftoken = getCookie('csrftoken');
            fetch("/api/process_order", {method: 'POST', headers: {'X-CSRFToken': csrftoken},
                "Content-Type": "multipart/form-data", body: formData}).then((res) => {
                res.status===200 ? flashMessages('Order Received') : flashMessages('Error!') 
                setTimeout(() => {
                    flashMessages(null)
                }, 3000);
            });

        }
        
    }
    

    return (
        <div className="checkout">
            {flash ? <div className="flash-messages">{flash}</div> : <div></div>}  
            <div className="h2 ps-5 mt-2 text-type">Checkout</div>
            <Row className="m-0">
                <Col xs={12} md={7} className='order-1'>
                    <form className="p-2 mt-3 checkout-form w-50 mx-auto">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-user"></i></InputGroup.Text>
                            <FormControl onChange={handleFirstname}
                            value = {firstname}
                            placeholder="First Name"
                            type="text"
                            aria-label="firstname"
                            aria-describedby="basic-addon1" 
                            required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-user"></i></InputGroup.Text>
                            <FormControl
                            onChange={handleLastname}
                            value = {lastname}
                            placeholder="Last Name"
                            type="text"
                            aria-label="lastname"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-at"></i></InputGroup.Text>
                            <FormControl
                            onChange={handleLEmail}
                            value = {email}
                            placeholder="Email"
                            type="email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-address-book"></i></InputGroup.Text>
                            <FormControl
                            onChange={handleAddress_one}
                            value = {address_one}
                            placeholder="Address Line 1"
                            type="text"
                            aria-label="Address_one"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-address-book"></i></InputGroup.Text>
                            <FormControl
                            onChange={handleAddress_two}
                            value = {address_two}
                            placeholder="Address Line 2"
                            type="text"
                            aria-label="Address_two"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fas fa-phone"></i></InputGroup.Text>
                            <FormControl
                            onChange={handlePhone_number}
                            value = {phone_number}
                            placeholder="Phone Number"
                            type="tel"
                            aria-label="Phone_number"
                            aria-describedby="basic-addon1"
                            required />
                        </InputGroup>
                        <Button onClick={handleProductSubmit} variant="dark rounded-0 w-100 mb-2 order" type="submit" >Process Order</Button>  
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