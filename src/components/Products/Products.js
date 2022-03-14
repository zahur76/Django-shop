/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import './Products.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputGroup, FormControl } from 'react-bootstrap';
import { useEffect, useState } from "react";


function Products(props) {

    // Search Terms
    const [search, setSearchTerm] = useState(null)
    const [category, setCategory] = useState('women')
    const [products, setProducts] = useState(null);
    const [media, setMedia] = useState(null)
    const [subcategory, setSubcategory] = useState(null)
    const [subCategorySelect, setSubcategorySelect] = useState('all')


    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value)        
    }

    const handleCategory= (event) => {
        const value = event.currentTarget.getAttribute("value")
        setCategory(value)        
    }

    useEffect(() => {
        fetch("/api").then((res) => res.json())
        .then((data) => [setProducts(data.products), setSubcategory(data.subcategory)]).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        process.env.NODE_ENV==='development' ? setMedia('media/') : setMedia('https://django-react-universe.s3.amazonaws.com/media/')
    }, [])

    const productView = (products || []).map((element)=>
                    <Col className="text-light mb-2" key={element.id} xs={12} sm={6} md={4} lg={3}>                 
                        <div>
                            <div className="h4 text-info">{element.id}</div>
                            <div className="h4 text-info">{element.name}</div>
                            <div className="h4 text-info">{element.subcategory}</div>
                            <img src={media + element.image} alt=""/>
                        </div>                            
                    </Col>
    )

    const subcategoryMenu = (subcategory || []).map((element)=>
                <div className="d-inline"> 
                    {subCategorySelect===element ? <a href="#" className="h6 p-4 pb-1 border-bottom no-link">{element}</a> : <a href="#" className="h6 d-inline p-4 ">{element}</a>}
                </div>                           
    )    
    
    return (
        <div>         
            <div className="search-bar">
                <Row className="m-0 p-2">
                    <Col xs={12} md={5}>
                        <InputGroup className="my-auto">
                            <FormControl onChange={handleSearchTerm} value={search} placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />                 
                        </InputGroup>
                    </Col>
                    <Col xs={0} md={1} className="text-center my-auto">
                    </Col>
                    <Col xs={4} md={2} onClick={handleCategory} value='women' className="text-center my-auto p-2 text-light h6">
                        {category==='women' ? <div>WOMEN</div> : <a className='category' href="#">WOMEN</a>}
                    </Col>
                    <Col xs={4} md={2} onClick={handleCategory} value='men' className="text-center my-auto text-light h6">
                        {category==='men' ? <div>MEN</div> : <a className='category' href="#">MEN</a>}
                    </Col>
                    <Col xs={4} md={2} onClick={handleCategory} value='kids' className="text-center my-auto text-light h6">
                        {category==='kids' ? <div>KIDS</div> : <a className='category'href="#">KIDS</a>}
                    </Col>
                </Row>            
            </div>
            <div className="subcategory mt-2 text-center">                
                    {subcategoryMenu}                
            </div>
            <div className="Planets mt-2">
                <Row className="m-0 p-2">
                    {productView}
                </Row>
            </div>
        </div>
    );
}

export default Products;