import React, { useEffect, useState } from "react";
import './data.styles.css'
import uploadImg  from '../../asset/upload.png'
import {TextField , Button} from '@mui/material';
import { ref ,getDownloadURL, uploadBytes } from "firebase/storage";
import { push , ref as fireRef } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { firebaseStorage, firebaseDatabase } from "../../backend/firebase-handler";
import { useNavigate } from "react-router-dom";

const DataCollections = () => {
    const Nav = useNavigate();
    const [Product , setProduct] = useState({
        image:'',
        Name:'',
        Price:'',
        MRP:''
    })

    const handlechange =(event) => {
        const {name , value} = event.target;
        setProduct({
            ...Product,
            [name]:value
        })

    }

    useEffect(() => {
        if(!Product.Price) {
            setProduct({
                ...Product,
                "MRP": 0
            })
        } else {
            const MRP = ((parseFloat(Product.Price)*0.18) + parseFloat(Product.Price))
            setProduct({
                ...Product,
                "MRP": MRP
            })
        }

    }, [Product.Price])

    const handleImage = () => {
        const temp = document.createElement('input')
        temp.setAttribute('type' , 'file')
        temp.onchange = async (event) => {
            const file = event.target.files[0]
            const key = uuidv4();
            const fileRef = ref(firebaseStorage , `TEMP_FOLDER/${key}`);
            await uploadBytes(fileRef, file)
            const downloadUrl = await getDownloadURL(fileRef);
            setProduct({
                ...Product,
                "image": downloadUrl
            })
            alert('Image Uploaded')
        }
        temp.click();
    }

    const handleClick = () => {
        if (Product.image == "" || Product.Name == "" || Product.Price == "") {
          alert("Upload All Data");
        }  else {
          const sendData = async () => {
            const fbref = fireRef(firebaseDatabase, "PRODUCT-RECORD");
            await push(fbref, Product);
            alert("Product Recorded!");
            Nav("/product-list");
          };
          sendData();
        }
      };


    return(
        <div className="page-container" >
            <div className="data-container">
                <img className="image" src={Product.image?Product.image:uploadImg} onClick={handleImage} alt = "Uplaod Product"/>
                <TextField onChange={handlechange} name = {'Name'} value = {Product.Name} sx = {{width:'500px' , marginBottom:'15px'}} id="outlined-basic" label="Name" variant="outlined"/>
                <TextField onChange={handlechange} type = {'number'} name = {'Price'} value = {Product.Price} sx = {{width:'500px' , marginBottom:'15px' }} id="outlined-basic" label="Price" variant="outlined"/>
                <TextField value = {Product.MRP} sx = {{width:'500px' , marginBottom:'15px'}} id="outlined-basic" label="MRP" variant="outlined"/>
                <Button variant = 'contained' onClick={handleClick}>Save Product</Button>
            </div>
        </div>
    )
}

export default DataCollections;