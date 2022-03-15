/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Admin.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navigate } from 'react-router-dom';
import { Button } from "react-bootstrap";


function Admin(props) {

    const [kids, setkids] = useState(null)
    const [women, setWomen] = useState(null)
    const [men, setMen] = useState(null)

    useEffect(() => {
        fetch("/api/category_list").then((res) => res.json())
        .then((data) => [setkids(data['kids'], setWomen(data['women'], setMen(data['men'])))]).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const categoryViewKids = (kids || []).map((element)=>
                    element!=='all' ? <Col className="h5 ps-2" xs={3} md={2} lg={1}><Button variant="outline-dark">{element}</Button></Col> : <Col className="d-none"></Col>
    )
    const categoryViewWomen = (women|| []).map((element)=>
                    element!=='all' ? <Col className="h5 ps-2" xs={3} md={2} lg={1}><Button variant="outline-dark">{element}</Button></Col> : <Col className="d-none"></Col>                       
                    
    ) 
    const categoryViewMen = (men || []).map((element)=>
                    element!=='all' ? <Col className="h5 ps-2" xs={3} md={2} lg={1}><Button variant="outline-dark">{element}</Button></Col> : <Col className="d-none"></Col>
    ) 

    return (
        <div className="admin-view">
            {localStorage.getItem("login")!=='true' ? <Navigate to='/' /> : <div></div>}
            <Row className="m-0 text-center h3">
                <Col xs={12}>Admin</Col>
            </Row>
            <Row className="m-0 h4 mb-5 mt-3">
                <Col xs={12} className="mb-2 border-bottom border-secondary"><i class="fas fa-plus-circle"></i> Kids</Col>
                {categoryViewKids}  
            </Row>
            <Row className="m-0 h4 mb-5">
                <Col xs={12} className="mb-2 border-bottom border-secondary"><i class="fas fa-plus-circle"></i> women</Col>
                {categoryViewWomen}  
            </Row>
            <Row className="m-0 h4">
                <Col xs={12} className="mb-2 border-bottom border-secondary"><i class="fas fa-plus-circle"></i> Men</Col>
                {categoryViewMen}  
            </Row>
                   
        </div>
    );
}

export default Admin;