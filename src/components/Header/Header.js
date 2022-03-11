/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Header.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Collapse, Card } from "react-bootstrap";


function Header(props) {
    // collapse menu
    const [open, setOpen] = useState(false);

    return (
        <div>
        <Row className='header m-0 bg-dark'>
            <Col className='logo text-center p-2 text-light' xs={9} md={3}>Logo</Col>
            <Col className='links text-end p-2 d-none d-md-block' md={9}>
                <a className="p-2" href="#">Home</a>
                <a className="p-2" href="#">Contact Us</a>
                <a className="p-2" href="#">Basket</a>
                <a className="p-2" href="#"><i class="fas fa-user"></i></a>                
            </Col>
            <Col className='links text-end p-2 d-md-none text-light'>
                <div onClick={() => setOpen(!open)}><i class="fa-solid fa-bars"></i></div>
            </Col>            
        </Row>
        <div style={{minHeight: '150px'}}>
            <Collapse in={open} dimension="width">
                <div id="example-collapse-text">
                    <Card className="bg-collapse" body style={{width: '400px'}}>
                        <Col xs="12">Home</Col>
                        <Col xs="12">Contact Us</Col>
                        <Col xs="12">Admin</Col>
                    </Card>
                </div>
            </Collapse>
        </div>
        </div>
    );
}

export default Header;