/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import './Products.css';


function Products(props) { 
    
    return (
        <div className="products">
            {props.searchStatus}                        
        </div>
    );
}

export default Products;