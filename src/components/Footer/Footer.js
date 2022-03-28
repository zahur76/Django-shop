/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Footer.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";


function Footer(props) {
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null); 
    const [query, setQuery] = useState(null); 

    // flash messages
    const [flash, flashMessages] = useState(null)
    
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleQueryChange = (event) => {
        console.log(event.target.id)
        setQuery(event.target.text)
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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('query', query)

        var csrftoken = getCookie('csrftoken');
        fetch("/api/query", {method: 'POST', headers: {'X-CSRFToken': csrftoken},
            "Content-Type": "multipart/form-data", body: formData}).then((res) => {
            res.status===200 ? flashMessages('Email Sent!') : flashMessages('Error!')
            localStorage.removeItem("basket")                
            setTimeout(() => {
                setShow(false)
                setName(null)
                setEmail(null)
                setQuery(null)
                flashMessages(null)
            }, 2000);
        });        

    }

    return (
        <div className="footer bg-dark">
            {flash ? <div className="flash-messages">{flash}</div> : <div></div>}  
            <Row className="m-0">
                <Col xs={2}></Col>
                <Col xs={8} className="text-center p-2 mt-2">
                    <div className="d-inline p-2 footer-links"><a href="https://www.linkedin.com/in/zahur-meerun-6323841b5?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FagV5B91SXSW6yDuu%2BoVcA%3D%3D" target="_blank" rel="noreferrer"><i class="text-light fab fa-linkedin h3"></i></a></div>
                    <div className="d-inline p-2 footer-links" onClick={handleShow}><a href="#"><i class="text-light fas fa-at h3"></i></a></div>
                    <div className="d-inline p-2 footer-links"><a href="https://github.com/zahur76" target="_blank" rel="noreferrer"><i class="text-light  fab fa-github h3"></i></a></div>
                </Col>
                <Col xs={2}></Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="m-0 p-2" closeButton>
                    <Modal.Title><div className="text-dark">Get In Touch</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="p-2 login-modal" onSubmit={handleFormSubmit}>
                        <InputGroup className="mb-3 sign-in">
                            <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-user"></i></InputGroup.Text>
                            <FormControl placeholder="Name" value={name} onChange={handleNameChange} aria-label="Name" aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <InputGroup className="mb-3 sign-in">
                            <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-user"></i></InputGroup.Text>
                            <FormControl placeholder="email" value={email} onChange={handleEmailChange} aria-label="email" aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <InputGroup className="mb-3 w-100">
                            <textarea className="w-100" id={query} onChange={e => setQuery(e.target.value)} placeholder="Query" required/>
                        </InputGroup>
                        <Button variant="outline-dark rounded-0 w-100 mb-2" type="submit" >Submit</Button>  
                    </form>
                </Modal.Body>
            </Modal>           
        </div>
    );
}

export default Footer;