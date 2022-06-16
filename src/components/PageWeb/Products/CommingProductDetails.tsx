import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { IoReturnDownBackSharp } from "react-icons/io5";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import {
  FaShippingFast,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaInvision,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Navbar/Navbar";
import axios from "axios";
import Footer from "../Store/Footer";

type TypeOf_Product =
{
  id: number;
  nameProduct: string;
  model: string;
  image: string;
  price: number;
  describes: string;
  color: string;
};




export default function ProductDetails() {

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { idP, setIdP, user, setUser } = useAppContext();
  const [product, setProduct] = useState<TypeOf_Product>();

  useEffect(() => {
    getAPI();
  }, []);
  const getAPI = () => {
    axios({
      method: "get",
      url: `http://localhost:9191/productById/${idP}`,
      data: null,
    })
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ==========================================
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
// =====================================

  return (
    <>
    <div>
      {/* header */}
      

      {/* body */}
      <div id="bodySection-p-detail">
        
        <div className="bodyContainer">
          <div className="btn-back">
            <button className="link bttn" onClick={() => navigate(-1)}>
              <IoReturnDownBackSharp size={25} />{" "}
            </button>
          </div>
          <div className="image">
            <img src={product?.image}/>
          </div>
          <div className="infomation">
            <h1 className="nameProduct">{product?.nameProduct}</h1>

            <div className="rate">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <span className="rateReviews"></span>
            </div>

            <div className="priceProduct">{product?.price} <span>đ</span> </div>

            <div className="describeProduct">
              <p>{product?.describes}</p>
            </div>
            <div className="describeProduct" style={{ color: 'red', fontStyle: 'italic'}}>
              <p>HÀNG SẮP VỀ</p>
            </div>
           

            <div className="quantityProduct">
              <div className="boxButton">
                <button
                  className="btQuantity" style={{ opacity: 0.5}}
                >
                  -
                </button>
                <span className="numberQuantity">{quantity}</span>
                <button
                  className="btQuantity" style={{ opacity: 0.5}}
                >
                  +
                </button>
              </div>
              <button className="btAdd" style={{ opacity: 0.5}}>ADD TO CART</button>
            </div>

            <div className="line"></div>
            <Contact />
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

const Contact = () => {
  const [love, setLove] = useState(false);
  return (
    <div className="contact">
    <button className="wishlist" onClick={() => setLove(!love)}>
      {love == false ? (
        <AiOutlineHeart size={20} />
      ) : (
        <AiFillHeart size={20} />
      )}
      <span className="textWishlist">Add to wishlist</span>
    </button>

    <div className="boxIcon">
      <div className="footerIcon">Share:</div>
      <div className="footerIcon">
        <FaFacebook size={18} />
      </div>
      <div className="footerIcon">
        <FaInstagram size={18} />
      </div>
      <div className="footerIcon">
        <FaInvision size={18} />
      </div>
      <div className="footerIcon">
        <FaPinterest size={18} />
      </div>
      <div className="footerIcon">
        <FaTiktok size={18} />
      </div>
    </div>
  </div>
  )
}