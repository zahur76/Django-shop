/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Footer.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Footer(props) {  

    return (
        <div className="footer bg-dark">
            <Row className="m-0">
                <Col xs={2}></Col>
                <Col xs={8} className="text-center p-2 mt-2">
                    <div className="d-inline p-2 footer-links"><a href="https://www.linkedin.com/in/zahur-meerun-6323841b5?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FagV5B91SXSW6yDuu%2BoVcA%3D%3D" target="_blank" rel="noreferrer"><i class="text-light fab fa-linkedin h3"></i></a></div>
                    <div className="d-inline p-2 footer-links"><a href="/"><i class="text-light fas fa-at h3"></i></a></div>
                    <div className="d-inline p-2 footer-links"><a href="https://github.com/zahur76" target="_blank" rel="noreferrer"><i class="text-light  fab fa-github h3"></i></a></div>
                </Col>
                <Col xs={2}></Col>
            </Row>            
        </div>
    );
}

export default Footer;