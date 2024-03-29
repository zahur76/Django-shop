/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import './Header.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Collapse, Card, Modal, InputGroup, FormControl, Button} from "react-bootstrap";


function Header(props) {
    // collapse menu
    const [open, setOpen] = useState(false);

    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Basket
    const [basketActive, setBasketActive] = useState(true);


    // flash messages
    const [flash, flashMessages] = useState(null)

    // Login
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(localStorage.getItem("login"));
    const [logout, setLogout] = useState(null)

    //Basket cookie
    const [basket, setBasket] = useState(JSON.stringify([]));
    const [basketProp, setBasketProp] = useState(<i class="fa-solid fa-basket-shopping text-success"></i>);
    const [render, setRender] = useState(false)

    //pathway to remove links
    const location = useLocation();

    useEffect(() => {
        setRender(true)
    }, [basket]); 

    useEffect(() => {
        if(!localStorage.getItem('basket')){
            setBasket(JSON.stringify([]))
        }else{
            setBasket(localStorage.getItem('basket'), [])
        }                 
        setBasketProp(<i class="fa-solid fa-basket-shopping text-primary"></i>)
        setTimeout(() => {
            setBasketProp(<i class="fa-solid fa-basket-shopping text-success"></i>)
        }, 1000);    
    }, [props.onQuantity]);    

    console.log(basket)
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        let data = {'username': username, 'password': password}
        fetch("/api/login", {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify(data)}).then((res) => res.json())
        .then((data) => [localStorage.setItem("login", data.login), data.login ? flashMessages('Login Successful!') : flashMessages('Incorrect Username/password!')]).then(() => {
            setLogin(localStorage.getItem("login"))            
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
                      
        });
        setShow(false);
    }

    const handleLogout = (e) => {
        e.preventDefault()
        fetch("/api/logout").then((res) => res.json())
        .then((data) => [localStorage.setItem("login", data.login ? flashMessages(null) : flashMessages('Logout Successful')), setLogout(<Navigate to='/' />)]).then(() => {
            setLogin(localStorage.getItem("login"))
            setLogout(null)
            setTimeout(() => {
                flashMessages(null)
            }, 3000);
        });
    }

    const handleBasketActive = () => {                      
        props.setActive(basketActive)
    }    

    return (
        <div>
            {logout}            
            {flash ? <div className="flash-messages">{flash}</div> : <div></div>}    
            <Row className='header m-0 bg-dark'>
                <Col className='logo text-start p-2 text-light h4' xs={8} md={3}><a href="/">Shop4U</a></Col>
                <Col className='links text-end p-2 d-none d-md-block' md={9}>
                    <a className="p-2" href="/"><i class="fas fa-home"></i></a>
                    {login==='true' || location.pathname==='/checkout' ? <a href="#"></a> : JSON.parse(basket).length!==0 ? <a onClick={handleBasketActive} className="p-2" href="#" value={props.onQuantity}>{basketProp}</a> : <a className="p-2" href="#"><i class="fa-solid fa-basket-shopping"></i></a>}
                    {login==='true' ? <a className="p-2" href="/admin"><i className="text-success fas fa-user"></i></a> : <a onClick={handleShow} className="p-2" href="#"><i class="fas fa-user"></i></a>}
                    {login==='true' ? <a onClick={handleLogout} className="p-2" href="#"><i class="fas fa-sign-out"></i></a> : <div></div>}         
                </Col>
                <Col className='links text-end p-2 d-md-none text-light'>
                    {login==='true' ? <a href="#"></a> : JSON.parse(basket).length!==0 ? <a onClick={handleBasketActive} className="p-2" href="#" value={props.onQuantity}>{basketProp}</a> : <a className="p-2" href="#"><i class="fa-solid fa-basket-shopping"></i></a>}
                    <div className="d-inline p-1" onClick={() => setOpen(!open)}>{open ? <i class="fa-solid fa-xmark"></i>: <i class="fa-solid fa-bars"></i>}</div>
                </Col>                          
            </Row>
            <div className="side-menu d-md-none" style={{minHeight: '150px'}}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text text-light">
                        <Card className="bg-collapse" body style={{width: '275px'}}>
                            {login==='true' ? <a className="p-0" href="/admin"><i className="text-success fas fa-user"></i></a> : <a onClick={handleShow} className="p-2" href="#"><i class="fas fa-user"></i></a>}
                            <Col xs="12"><a href="/">Home</a></Col>
                            <Col xs="12">Contact Us</Col>
                            {login==='true' ? <a onClick={handleLogout} className="p-0" href="#"><i class="fas fa-sign-out"></i></a> : <div></div>}                          
                        </Card>
                    </div>
                </Collapse>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="m-0 p-2" closeButton>
                    <Modal.Title><div className="text-dark">Login</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="p-2 login-modal" onSubmit={handleLoginSubmit}>
                        <InputGroup className="mb-3 sign-in">
                            <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-user"></i></InputGroup.Text>
                            <FormControl placeholder="Username" username={username} onChange={handleUsernameChange} aria-label="Username" aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-key"></i></InputGroup.Text>
                            <FormControl type="password" password={password} onChange={handlePasswordChange} placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <Button variant="outline-dark rounded-0 w-100 mb-2" type="submit" >Submit</Button>  
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Header;