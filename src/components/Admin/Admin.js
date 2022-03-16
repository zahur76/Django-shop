/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import './Admin.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navigate } from 'react-router-dom';
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";


function Admin(props) {

    const [category, setCategory] = useState(null)
    const [subCategory, setSubcategory] = useState(null)
    const [products, setProducts] = useState(null)
    const [media, setMedia] = useState('/media/')
    const [update, setUpdate] = useState(null)


    // flash messages
    const [flash, flashMessages] = useState(null)

    // Modal Product Form
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [size, setSize] = useState('');
    const [image, setImage] = useState(null);

    const handleNameChange = (event) => {
        setName(event.currentTarget.value)
    }

    const handlePriceChange = (event) => {
        setPrice(event.currentTarget.value)
    }

    const handleStockChange = (event) => {
        setStock(event.currentTarget.value)
    }

    const handleSizeChange = (event) => {
        setSize(event.currentTarget.value)
    }

    const handleImageChange = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        console.log(file)
        setImage(file);
    }

    const handleShow = (event) => {
        setCategory(event.currentTarget.getAttribute("id"))
        setSubcategory(event.currentTarget.getAttribute("value"))
        setShow(true);
    }

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

    useEffect(() => {
        fetch("/api/all_products").then((res) => res.json())
        .then((data) => [setProducts(data)]).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])
    
    const categoryViewKids = (kids || []).map((element)=>
                    element!=='all' ? <Col onClick={handleShow} value={element} id='kids' className="h5 ps-2" xs={3} md={2} lg={1}><Button variant="outline-dark">{element}</Button></Col> : <Col className="d-none"></Col>
    )
    const categoryViewWomen = (women|| []).map((element)=>
                    element!=='all' ? <Col onClick={handleShow} value={element}id='women' className="h5 ps-2" xs={3} md={2} lg={1}><Button variant="outline-dark">{element}</Button></Col> : <Col className="d-none"></Col>                       
                    
    ) 
    const categoryViewMen = (men || []).map((element)=>
                    element!=='all' ? <Col onClick={handleShow} value={element} id='men' className="h5 ps-2" xs={3} md={2} lg={1}><Button variant="outline-dark">{element}</Button></Col> : <Col className="d-none"></Col>
    )

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

    const handleProductDelete = (event) => {
        let elementId = event.currentTarget.id
        fetch(`/api/delete_product/${elementId}`).then((res) =>
         [res.status===200 ? flashMessages('Product Deleted') : flashMessages('Error!'), setUpdate(true)]).catch((error) => {
            console.log(error);            
        });
        setTimeout(() => {
            setUpdate(false)
            flashMessages(null)
        }, 3000);        
    }

    const productView = (products || []).map((element)=>
                    <Col id={element.id} className="product-details mt-1 p-3" key={element.id} xs={4} md={2}>
                        <div className="admin-product-details">                                        
                            <div className="text-start ps-1 text-capitalize background-text">{element.name}</div>
                            <div className="text-start ps-1 text-capitalize background-text">{element.category}</div>
                            <div className="text-start ps-1 text-capitalize background-text">{element.subcategory}</div>
                            <div className="text-start ps-1 text-capitalize background-text">{element.sku}</div>
                        </div>                                          
                        <img src={process.env.PUBLIC_URL + media + element.image} className={'image' + element.id} alt={element.name} />
                        <div className="text-center" onClick={handleProductDelete} id={element.id}><a href="#"><i class="h5 text-danger fa-solid fa-trash-can"></i></a></div>
                    </Col>
    )    
    

    const handleProductSubmit = (e) => {
        e.preventDefault()
    
        let formData = new FormData()
        formData.append('category', category)
        formData.append('subcategory', subCategory)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('stock_available', stock)
        formData.append('sizes_available', size)
        formData.append('image', image)
        

        var csrftoken = getCookie('csrftoken');
        console.log(formData)

        fetch("/api/add_product", {method: 'POST', headers: {'X-CSRFToken': csrftoken},
            "Content-Type": "multipart/form-data", body: formData}).then((res) => {
            setShow(false)
            setUpdate(true)
            res.status===200 ? flashMessages('Product Added') : flashMessages('Error!') 
            setTimeout(() => {
                setUpdate(false)
                flashMessages(null)
            }, 3000);
        });
      }

    return (
        <div className="admin-view">
            {flash ? <div className="flash-messages">{flash}</div> : <div></div>}  
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
            <Row className="m-0 text-center h3">
                <Col xs={12}>Products</Col>
            </Row>
            <Row className='m-0 mt-2'>
                {productView}
            </Row>
            <Modal className="product-form" show={show} onHide={handleClose}>
                <Modal.Header className="m-0 p-2" closeButton>
                    <Modal.Title><div className="text-light text">Add Product</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form  className="p-3" onSubmit={handleProductSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                            onChange={handleNameChange}
                            placeholder="name"
                            aria-label="name"
                            aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl
                            onChange={handlePriceChange}
                            placeholder="Price"
                            type="number"
                            aria-label="name"
                            aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i class="fas fa-box"></i></InputGroup.Text>
                            <FormControl
                            onChange={handleStockChange}
                            placeholder="Stock Available"
                            type="number"
                            aria-label="name"
                            aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i class="fas fa-box"></i></InputGroup.Text>
                            <FormControl
                            onChange={handleSizeChange}
                            placeholder="Sizes (e.g s,m,l)"
                            type="text"
                            aria-label="name"
                            aria-describedby="basic-addon1" required/>
                        </InputGroup>
                        <Form.Control name="image" type="file" multiple onChange={handleImageChange} required/>
                        <input className="col-12 btn submit-button text-light mt-3 border-light" type="submit" value="Submit" />                       
                    </form>
                </Modal.Body>
            </Modal>
                   
        </div>
    );
}

export default Admin;