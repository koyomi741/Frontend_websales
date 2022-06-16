// import { View, Text } from 'react-native'
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Navbar/Navbar";

type props = {
  onClick: () => void;
  id: number;
  nameProduct: string;
  model: string;
  image: string;
  price: number;
  describes: string;
  color: string;
};

export default function ProductItem({
  onClick,
  id,
  nameProduct,
  model,
  image,
  price,
  describes,
  color,
}: props) {
  const navigate = useNavigate();
  const { idP, setIdP } = useAppContext();
  const togg = () => {
    onClick();
    setIdP(id); 
  };

  const StylePrice = (price : number) => {
    let num = price+""
    let s = "";
    for( let i = 0; i < num.length; i++)
    {
      s = num[num.length -1 - i ] + s;

      if((i+1) % 3 ==0 && i != (num.length-1) ) {
        s = "." + s;
      }
    }
    return s;
  }
  //=========================================
  // giam gia
  const {promotion, setPromotion} =useAppContext();
  const {saleOf_Shirt, setSaleOf_Shirt}= useAppContext();
  const {saleOf_Shoes, setSaleOf_Shoes}= useAppContext();
  const {saleOf_Watch, setSaleOf_Watch}= useAppContext();

  const checkSale = () => {
    if(model == "Áo")
      return saleOf_Shirt+"%";
    if(model == "Giày")
      return saleOf_Shoes+"%";
    if(model == "Đồng hồ")
      return saleOf_Watch+"%";
  }
  const Price_SaleOf = () => {
    if(model == "Áo")
      return price * (100 - saleOf_Shirt) / 100;
    if(model == "Giày")
      return price * (100 - saleOf_Shoes) / 100;
    if(model == "Đồng hồ")
      return price * (100 - saleOf_Watch) / 100;
    return price;
  }
  //
  const check_hang_moi = () => {
    if(id >= 40 && id <= 60)
      return "Hàng mới về"
    else
      return ""
  }

  return (
    <Button id="item" onClick={togg}>
      <div className="container-product">
        <div className="image">
        <img src={image} />
        </div>
        <div className="infomation">
          <a className="name" color="black" href="abc">
            {nameProduct}
          </a>
        </div>
        <div className="price">
          <div style={{fontSize: 15, color: 'black'}}>Giảm {checkSale()}</div>
          <div>
            <span style={{fontSize: 15, color: 'black'}}>Giá: </span>
              {StylePrice(Price_SaleOf())}
            <span>đ</span>
          </div>

          <div style={{color: "gray", fontSize: 15, fontStyle: "italic"}}>
            <span>Giá gốc: </span>
            {StylePrice(price)}
            <span>đ</span>
          </div>
          <div>{check_hang_moi()}</div>
        </div>
      </div>
    </Button>
  );
}
