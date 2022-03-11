/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Footer.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Footer(props) {  

    return (
        <div className="footer">
            <Row className="m-0">
                <Col xs={12}>Footer</Col>
            </Row>            
        </div>
    );
}

export default Footer;