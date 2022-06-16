import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Navbar/Navbar';
import "./ProductSizeDetail.css";

type Array_productSizes = [Type_ProductSize]

type Type_ProductSize = {
    id : number,
    product_id : number,
    product: {
      id: number,
      nameProduct: String,
      model: String,
      image: String,
      price: String,
      describes: String,
      color: String,    
    },
    size_id: number,
    size: {
      id : number,
      size : String,
    },
    quantity: number,
}

const test = {
      "id": 1,
      "nameProduct": "Áo thun đỏ đơn giản",
      "model": "Áo",
      "image": "https://firebasestorage.googleapis.com/v0/b/test-62604.appspot.com/o/img1.jpg?alt=media&token=00b86012-129f-4885-8033-77655cf76e03",
      "price": 150000,
      "describes": "Chất liệu vải cốt tông, mặc thoải mái",
      "color": "Đỏ"
}

export default ()  => {
    const {idP, setIdP} = useAppContext();
    const [productSize, setProductSize] = useState([]);
    const [product, setProduct] = useState(test)
    useEffect(() => {
        getAPI();
        getProduct();
    }, []);
    const getAPI = () => {
    axios({
        method: "get",
        url: `http://localhost:9191/productSizeByProductId/${idP}`,
        data: null,
        })
          .then((res) => {
            setProductSize(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const getProduct = () => {
      axios({
          method: "get",
          url: `http://localhost:9191/productById/${idP}`,
          data: null,
          })
            .then((res) => {
              setProduct(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
      };
// ===============================================
const navigate = useNavigate();
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
  return (
    //   huy
    <div id="bodySection-p-detail">
        <div className="bodyContainer">
          <div className="btn-back">
            <button className="link bttn" 
              onClick={() => navigate(-1)}
            >
              <IoReturnDownBackSharp size={25} />{" "}
            </button>
          </div>
          <div className="image">
            <img src={productSize.length > 0 ? product.image:""} />
          </div>
          <div className="infomation">
            <h1 className="nameProduct">{productSize.length > 0 ?product.nameProduct:""}</h1>

            <div className="rate">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <span className="rateReviews"></span>
            </div>

            <div className="priceProduct">{productSize.length > 0 ? StylePrice(product.price) :""} <span>đ</span> </div>

            <div className="describeProduct">
              <p>{product.describes}</p>
            </div>
           
           {/* bang size */}
            <table>
                <thead style={{backgroundColor: "#00bcd4"}}>
                <tr>
                    <th>Size</th>
                    <th>Số lượng trong kho</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {
                    productSize.map(ps => (
                        <Product_Size ps={ps} />
                    ))
                }
                </tbody>
            </table>

          </div>
        </div>
        
    </div>
    
  )
}

type props = {
    ps : Type_ProductSize;
}


const Product_Size = ({ps} : props) => {

    const [quantity, setQuantity] = useState(ps.quantity);
    const update_quantity_ProductSize = () => {  
        axios({
          method: "put",
          url: "http://localhost:9191/updateProductSize",
          data: {
            "id": ps.id,
            "quantity": quantity,
        }
        })
          .then((res) => {
        })
          .catch((err) => {
            console.log(err);
        });
        alert("update thanh cong")
      }
    return (
      <tr>
        <td>{ps.size.size}</td>
        <td>
          <input
            className="input"
            type="text"
            placeholder= {quantity+""}
            onChange={(e) => setQuantity(Number(e.target.value))}  
          />
        </td>
        <td>
            <button className='bttn' style={{backgroundColor: "#ffc107"}} onClick={() => update_quantity_ProductSize()}>Update</button>
        </td>
      </tr>
    )
  }
  
  
  