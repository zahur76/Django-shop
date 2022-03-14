import './SearchBar.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputGroup, FormControl } from 'react-bootstrap';
import { React, useState } from "react";

function SearchBar(props) {
    
    // Search Terms
    const [search, setSearchTerm] = useState(null)

    const handleSearchTerm = (event) => {
        console.log(event.target.value)
        setSearchTerm(event.target.value)
    }

    return (
        <div className="search-bar">
            <Row className="m-0 p-2">
                <Col xs={12} md={5}>
                    <InputGroup className="my-auto">
                        <FormControl onChange={handleSearchTerm} placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />                 
                    </InputGroup>
                </Col>
                <Col xs={0} md={1} className="text-center my-auto">
                </Col>
                <Col xs={4} md={2} className="text-center my-auto p-2">
                    <div>Men</div>
                </Col>
                <Col xs={4} md={2} className="text-center my-auto">
                    <div>Women</div>
                </Col>
                <Col xs={4} md={2} className="text-center my-auto">
                    <div>Kids</div>
                </Col>
            </Row>            
        </div>
    );
}

export default SearchBar;