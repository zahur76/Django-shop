/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import './Products.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputGroup, FormControl, Modal, Button, Offcanvas } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { counter } from "@fortawesome/fontawesome-svg-core";


function Products(props) {

    // Search Terms
    const [search, setSearchTerm] = useState(null)
    const [category, setCategory] = useState('women')
    const [products, setProducts] = useState(null);
    const [masterProducts, setMasterProduct] = useState(null);
    const [allProducts, setAllProducts] = useState(null);
    const [media, setMedia] = useState('/media/')
    const [subcategory, setSubcategory] = useState(null)
    const [subCategorySelect, setSubcategorySelect] = useState('all')
    const [productModal , setProductModal] = useState({id: '', 
        subcategory: '', 
        category: '', 
        price: '',
        sizes: '',
        rating: '',
         image: ''});
    const [sizeIndex, setIndex] = useState(0)
    
    // handle product modal basket
    const [quantity, setQuantity] = useState(JSON.parse(localStorage.getItem('basket')).length)

    //Basket cookie
    const [basket, setBasket] = useState(localStorage.getItem('basket', JSON.stringify([])));


    // force rerender when when product modal infor changes
    useEffect(() => {
      }, [productModal, quantity, basket]);

    
    // Product Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [basketModal, setSBasketModal] = useState(false);
    const handleCloseBasket = () => {
        setSBasketModal(false)
        props.setStatus(false)
    };

    useEffect(() => {        
        setSBasketModal(props.onActive)
        console.log(props.onActive)        
    }, [props.onActive])


    const handleShow = (event) => {
        let productId = event.currentTarget.id
        let newList = []
        masterProducts.map((element)=>{
            element.id.toString()===productId.toString() ? newList.push(element) : console.log('none')       
            return newList            
        })
        setProductModal(newList[0])
        setShow(true) 
    }

    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value)
        let term = event.target.value
        let allItems = masterProducts
        let newList = []
        allItems.map((element)=>{
            if(((element.name).toLowerCase()).includes(term.toLowerCase())){
                newList.push(element)                    
            }
            setProducts(newList)            
            return newList
        })         
    }

    const handleCategory= (event) => {
        const value = event.currentTarget.getAttribute("value")
        setCategory(value)
        fetch(`/api/${value}`).then((res) => res.json())
        .then((data) => [setProducts(data.products), setSubcategory(data.subcategory), setMasterProduct(data.products), setSubcategorySelect('all')]).catch((error) => {
            console.log(error);
        });       
    }

    useEffect(() => {
        fetch("/api/women").then((res) => res.json())
        .then((data) => [setProducts(data.products), setSubcategory(data.subcategory), setMasterProduct(data.products)]).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubcategory = (event) => {
        let select = event.currentTarget.getAttribute("value")
        setSubcategorySelect(select)
        let newList = []
        let allItems = masterProducts
        if(select==='all'){
            setProducts(masterProducts)
        }else{
            allItems.map((element)=>{
                if(((element.subcategory).toLowerCase()).includes(select.toLowerCase())){
                    newList.push(element)                    
                }
                setProducts(newList)
                return newList
            })
        }        
    }

    const handleMouseOver = (event) => {
        const imageId = event.currentTarget.getAttribute("id")
        let element = document.getElementsByClassName('image' + imageId)
        element[0].style.transform = 'scale(1.05)'
          
    }

    const handleMouseOut = (event) => {
        const imageId = event.currentTarget.getAttribute("id")
        let element = document.getElementsByClassName('image' + imageId)
        element[0].style.transform = 'scale(1.0)'
        
    }

    const handleRating = (rating) => {
        let ratingList = []
        let i
        for(i=1; i<=rating; i++){
            ratingList.push(<span class="fa fa-star checked"></span>)
        }
        for(i=1; i<=(5-rating); i++){
            ratingList.push(<span class="fa fa-star unchecked"></span>)
        }
        return ratingList
    }

    const productView = (products || []).map((element)=>
                    <Col onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id={element.id} className="product-details mt-2" key={element.id} xs={6} sm={4} md={3} lg={2}>
                        <div className="m-2">     
                        <a href="#" onClick={handleShow} id={element.id}>
                                <div className="image-container"><img src={process.env.PUBLIC_URL + media + element.image} className={'image' + element.id} alt={element.name} /></div>                         
                                <div className="bg-details">
                                    <div className="text-start bg-text text-grey ps-2 pt-2">$ {element.price}</div>
                                    <div className="text-start bg-text text-light-grey ps-2 text-type product-name">{element.name}</div>
                                    <div className="ps-2 pb-2 bg-text ">{handleRating(element.rating)}</div>                                                    
                                </div>
                            </a>
                        </div>                                    
                    </Col>
    )

    const subcategoryMenu = (subcategory || []).map((element)=>
                <div onClick={handleSubcategory} value={element} key={element} className="d-inline text-center"> 
                    {subCategorySelect===element ? <a href="#" className="h6 m-2 m-md-4 no-link pb-1">{element}</a> : <a href="#" className="h6 m-2 m-md-4 d-inline">{element}</a>}
                </div>                           
    )


    const handleItemDelete = (event) => {
        console.log(event.target.id)
        let addBasket = JSON.parse(localStorage.getItem('basket'))
        addBasket.splice(event.target.id, 1)
        console.log(addBasket)
        localStorage.setItem('basket', JSON.stringify(addBasket))
        setBasket(localStorage.getItem('basket'))
        setQuantity(1)
        props.onQuantity(addBasket.length)
    }
    
    const basketView = (JSON.parse(basket) || []).map((element, index)=>
                <Row className="m-0 pb-2" key={index}>
                    <Col xs={9} md={10} className='border-bottom border-secondary text-basket'>{index+1}.{element.name}</Col>
                    <Col xs={3} md={2} className='border-bottom border-secondary'><div onClick={handleItemDelete} id={index} className="text-center text-danger btn p-0">Delete</div></Col>
                    <Col xs={5} className='text-secondary'>Quantity: {element.quantity}</Col>
                    <Col xs={5} className='text-secondary'>Size: {element.size}</Col>
                    <Col xs={2}></Col>
                    <Col xs={8} className='text-secondary'>Price:</Col>
                    <Col xs={4} className='text-end'>{element.price}</Col>
                </Row>                          
    )

    const handleSizeSelection = (event) => {
        let size = event.currentTarget.id
        setIndex(size)
    }    
    
    const productSizes = (productModal.sizes_available || []).map((element, index)=>{
        return index===parseInt(sizeIndex) ? <Col xs={4} className="text-center p-1"><Button className="bg-dark text-light rounded-0 w-100 p-1 disable">{element}</Button></Col> : <Col xs={4} onClick={handleSizeSelection} id={index} className="text-center p-1"><Button variant="outline-dark rounded-0 w-100 p-1">{element}</Button></Col>
    })

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    }
    
    const handleAddToBasket = (event) => {
        // localStorage.setItem('basket', JSON.stringify([]))
        let addBasket = JSON.parse(localStorage.getItem('basket'))
        addBasket.push({'id': productModal.id, 'name': productModal.name, 'price':productModal.price, 'quantity': quantity, 'size': productModal.sizes_available[parseInt(sizeIndex)]})
        localStorage.setItem('basket', JSON.stringify(addBasket))
        setBasket(localStorage.getItem('basket'))
        setQuantity(1)
        props.onQuantity(quantity)
        setShow(false)
        setIndex(0)    
    }

       
    return (
        <div className="product-view">
            <div className="search-bar">
                <Row className="m-0 p-2">
                    <Col xs={12} md={5}>
                        <InputGroup className="my-auto">
                            <FormControl onChange={handleSearchTerm} value={search} placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />                 
                        </InputGroup>
                    </Col>
                    <Col xs={0} md={1} className="text-center my-auto">
                    </Col>
                    <Col xs={4} md={2} onClick={handleCategory} value='women' className="text-center my-auto p-2 text-light subcategory-link">
                        {category==='women' ? <div>WOMEN</div> : <a className='category' href="#">WOMEN</a>}
                    </Col>
                    <Col xs={4} md={2} onClick={handleCategory} value='men' className="text-center my-auto text-light subcategory-link">
                        {category==='men' ? <div>MEN</div> : <a className='category' href="#">MEN</a>}
                    </Col>
                    <Col xs={4} md={2} onClick={handleCategory} value='kids' className="text-center my-auto text-light subcategory-link">
                        {category==='kids' ? <div>KIDS</div> : <a className='category'href="#">KIDS</a>}
                    </Col>
                </Row>            
            </div>
            <Row className="subcategory mt-2 text-center m-0">
                <Col xs={12}>{subcategoryMenu}</Col>                        
            </Row>
            <div className="text-secondary breadcrumbs ps-3 mt-2">{category.toUpperCase()} > {subCategorySelect.toUpperCase()}</div>  
            <div className="Products mt-2">
                <Row className="m-0 p-0">
                    {productView}
                </Row>
            </div>
            <Modal className="product-modal" show={show} onHide={handleClose}>
                <Modal.Body className="pb-1">
                    <Row className="mb-2">
                        <Col xs="6"><div className="image-container"><img src={process.env.PUBLIC_URL + media +productModal.image} className={'image' + productModal.id} alt={productModal.name} /></div>  </Col>
                        <Col xs="6">
                            <div className="modal-details-box">
                                <div className="element-id">{productModal.id}</div> 
                                <div className="text-start text-secondary ps-1 pt-2 text-type border-bottom">{productModal.name}</div> 
                                <div className="text-start text-dark ps-1 pt-2">$ {productModal.price}</div>                                
                                <div className="pb-2 border-bottom">{handleRating(productModal.rating)}</div>                             
                            </div>
                            <div className="text-start text-dark ps-1 pt-1 text-type">Quantity</div>   
                            <InputGroup className="mb-2 w-50 mt-2" size="sm">
                                <FormControl className="bg-light rounded-0 quantity" type="number" aria-label="quanitity" defaultValue={1} onChange={handleQuantity} value={quantity}/>
                            </InputGroup>
                            <div className="text-start text-dark ps-1 text-type">Sizes</div>                            
                            <Row className="sizes p-1 mb-1">
                                {productSizes}
                            </Row>    
                        </Col>
                    </Row>
                    <Button onClick={handleAddToBasket} variant="outline-dark rounded-0 w-100 mb-2">ADD TO BASKET</Button>                         
                </Modal.Body>
            </Modal>
            <Offcanvas className="p-2" show={basketModal} onHide={handleCloseBasket} placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title className="border-bottom text-center ps-3 pe-3">My Basket</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>                    
                    {basketView}                                      
                </Offcanvas.Body>
                <Button variant="dark rounded-0 w-100 m-4 mx-auto">CHECKOUT</Button> 
            </Offcanvas>
        </div>
    );
}

export default Products;