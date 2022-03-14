/* eslint-disable jsx-a11y/anchor-is-valid */
import './SearchBar.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputGroup, FormControl } from 'react-bootstrap';
import { React, useEffect, useState } from "react";

function SearchBar(props) {
    
    // Search Terms
    const [search, setSearchTerm] = useState(null)
    const [category, setCategory] = useState('women')

    useEffect(() => {
        props.onSearch(category)
    }, [props, category]);

    useEffect(() => {
        props.onSearch(search)
    }, [props, search]);

    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value)        
    }

    const handlezahur= (event) => {
        setCategory('men')        
    }

    return (
        <div className="search-bar">
            <Row className="m-0 p-2">
                <Col xs={12} md={5}>
                    <InputGroup className="my-auto">
                        <FormControl onChange={handleSearchTerm} value={search} placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />                 
                    </InputGroup>
                </Col>
                <Col xs={0} md={1} className="text-center my-auto">
                </Col>
                <Col xs={4} md={2} className="text-center my-auto p-2 text-light h6">
                    {category==='women' ? <div>WOMEN</div> : <a className='category' href="#">WOMEN</a>}
                </Col>
                <Col onClick={handlezahur} xs={4} md={2} className="text-center my-auto text-light h6">
                    {category==='men' ? <div>MEN</div> : <a className='category' href="#">MEN</a>}
                </Col>
                <Col xs={4} md={2} className="text-center my-auto text-light h6">
                    {category==='kids' ? <div>KIDS</div> : <a className='category'href="#">KIDS</a>}
                </Col>
            </Row>            
        </div>
    );
}

export default SearchBar;