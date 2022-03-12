/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Header.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Collapse, Card, Modal, Form, InputGroup, FormControl} from "react-bootstrap";


function Header(props) {
    // collapse menu
    const [open, setOpen] = useState(false);

     // Modal
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

    return (
        <div>
            <Row className='header m-0 bg-dark h6'>
                <Col className='logo text-start p-2 text-light' xs={8} md={3}>Logo</Col>
                <Col className='links text-end p-2 d-none d-md-block' md={9}>
                    <a className="p-2" href="#">Home</a>
                    <a className="p-2" href="#">Contact Us</a>
                    <a className="p-2" href="#"><i class="fa-solid fa-basket-shopping"></i></a>
                    <a onClick={handleShow} className="p-2" href="#"><i class="fas fa-user"></i></a>                
                </Col>
                <Col className='links text-end p-2 d-md-none text-light'>
                    <a className="p-2 d-inline" href="#"><i class="fa-solid fa-basket-shopping"></i></a>
                    <div className="d-inline p-1" onClick={() => setOpen(!open)}>{open ? <i class="fa-solid fa-xmark"></i>: <i class="fa-solid fa-bars"></i>}</div>
                </Col>            
            </Row>
            <div className="side-menu d-md-none" style={{minHeight: '150px'}}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        <Card className="bg-collapse" body style={{width: '275px'}}>
                            <Col xs="12">Home</Col>
                            <Col xs="12">Contact Us</Col>
                            <Col xs="12">Admin</Col>
                        </Card>
                    </div>
                </Collapse>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="m-0 p-2" closeButton>
                    <Modal.Title><div>Admin Login</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-user"></i></InputGroup.Text>
                            <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-key"></i></InputGroup.Text>
                            <FormControl
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"/>
                        </InputGroup>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Header;