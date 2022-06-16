import axios from 'axios';
import React, { useState } from 'react'
import "./ProductManagementStyle.css"


type product = {
    id: number;
    nameProduct: string;
    model: string;
    image: string;
    price: number;
    describes: string;
    color: string;
};

type props = {
    reload : () => void
    setUpdateModal : (isUpdate : Boolean) => void
    product : product;
};

export default  ({reload, setUpdateModal,product}: props) =>  {
    const [Id, setId ] = useState(product.id)
    const [NameProduct, setNameProduct ] = useState(product.nameProduct)
    const [Model, setModel ] = useState(product.model)
    const [Image, setImage ] = useState(product.image)
    const [Price, setPrice ] = useState(product.price)
    const [Describes, setDescribes ] = useState(product.describes)
    const [Color, setColor ] = useState(product.color)

    const updateProduct = () => {
        axios({
            method: "put",
            url: "http://localhost:9191/updateProduct",
            data:{
                "id": Id,
                "nameProduct": NameProduct,
                "model": Model,
                "image": Image,
                "price": Price,
                "describes": Describes,
                "color": Color
            },
          })
        .then((res) => {reload()})
        .catch((err) => {console.log(err);});
    };
  return (
    <tr>          
        <td>
            <div>{Id}</div>
        </td>

        <td>
            <input
                className="input"
                type="text"
                placeholder= {NameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
                >
            </input>
        </td>

        <td>
            <input
                className="input"
                type="text"
                placeholder= {Model}
                onChange={(e) => setModel(e.target.value)}
                ></input>
        </td>
        <td>
            <input
                className="input"
                type="text"
                placeholder= {Price+""}
                onChange={(e) => setPrice(Number(e.target.value))}    
                ></input>
        </td>
        <td>
            <input
                className="input"
                type="text"
                placeholder= {Describes}
                onChange={(e) => setDescribes(e.target.value)}    
                ></input>
        </td>
        <td>
            <input
                className="input"
                type="text"
                placeholder= {Color}
                onChange={(e) => setColor(e.target.value)}    
                ></input>
        </td>
        <button onClick={() => {
            updateProduct();
            setUpdateModal(true);
        }}
        >cập nhật</button>
        
    </tr>
  )
}
