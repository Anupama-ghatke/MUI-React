import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { firebaseDatabase } from "../../backend/firebase-handler";
import { useNavigate } from "react-router-dom";
import './ProductList.styles.css'
import { Button } from "@mui/material";

const ProductList = () => {
    const Nav = useNavigate();
    const [Productlist , setProductlist] = useState([]);

    const add =() => {
        Nav("/")
    }

    useEffect( () => {

        const fetchData = async () => {
            const ProductRef = ref(firebaseDatabase , `PRODUCT-RECORD`);
            onValue(ProductRef, (DataSnapshot) => {
                if (DataSnapshot.exists()) {
                    const tempVal = DataSnapshot.val();
                    console.log(Object.values(tempVal));
                    
                    const temp =[]
                    for (const key in DataSnapshot.val()) {
                        const Product = DataSnapshot.child(key).val();
                        temp.push(Product);
                    }
                    setProductlist(temp);
                }
                else {
                    alert("No records found")
                }
            })
        }

        fetchData()
    }, []);

    console.log(Productlist);

    return(
        <div>
            <div>
                <h1>List of Product</h1>
                <Button variant = 'contained' onClick={add}>Add PRODUCT</Button>
                <br></br>
            </div>
            <div className="grid-list">
            {
                Productlist.map((item) => {
                    return (
                        <div className="grid-content">
                                <img src={item.image} className="image"/>
                                    <p>Product Name : {item.Name}<br></br>
                                    Product Price : {item.Price}<br></br>
                                    Product MRP : {item.MRP}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ProductList;