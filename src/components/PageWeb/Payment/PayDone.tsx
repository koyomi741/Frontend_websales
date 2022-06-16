import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Navbar/Navbar';
import "./Payment.css"

type TypeOf_BillProducts = {
  id: Number,
  bill_id: Number,
  bill: {
      id: Number,
      client_id: Number,
      user: {
          id: Number,
          fullname: String;
          dob: String,
          gender: String,
          phone: String,
          address: String,
          username: String,
          password: String,
          isAdmin: Number,
          note: String,
      },
      datePayment: String,
      infoPayment: String,
  },
  product_id: Number,
  product: {
      id: Number,
      nameProduct: String,
      model: String,
      image: String,
      price: Number,
      describes: String,
      color: String,
  },
  quatity: Number,
  unitPrice: Number
}

export default function PayDone() {
  const navigate = useNavigate();
  const BackToProduct =() => {
    navigate("/product");
  }

  const {idBill, setIdBill} = useAppContext();

  // lay bill product
  const [billProduct, setBillProduct] = useState<TypeOf_BillProducts[]>([])

  useEffect(() => {
    getBillProduct();
  }, []);

  const getBillProduct = () => {
    axios({
      method: "get",
      url: `http://localhost:9191/billProductByBillId/${idBill}`,
      data: null,
    })
      .then((res) => {
        setBillProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };  

  return (
    <div style={{marginTop: 100}}>
      <h1>Thanh Toán Thành Công</h1>
      <button className='bttn' onClick={() => BackToProduct() }>Back to Product</button>
      <h2>{idBill+""}</h2>
      {
        billProduct.map(bs => (
          <>
            <div className="billProduct">
              <ShowProduct  bs={bs}/>
              <Comment product_id={bs.product_id} />
            </div>
          </>
        ))
      }
    </div>
  )
}

type props_ShowProduct = {
  bs : TypeOf_BillProducts,
}
const ShowProduct = ({bs} : props_ShowProduct) => {

  return (
    <div>
      <div className="p-4">
        <div className="media align-items-center">
          <img src={String(bs.product.image)} className="d-block ui-w-40 ui-bordered mr-4" />
          <div className="media-body">
            <a href="#" className="d-block text-dark">{bs.product.nameProduct}</a>
            <small>
              <span className="text-muted">Màu: </span>{bs.product.color} <br/>
              <span className="text-muted">{bs.product.describes}</span> <br/>
              <span className="text-muted">Ngày mua: </span>{bs.bill.datePayment}<br/>
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

type props_Comment = {
  product_id : Number,
}

const Comment = ({product_id} : props_Comment) => {
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("Sap pham tuyet voi");
  const {user, setUser} = useAppContext();
  const [check, setCheck] = useState(true)


  const addComment = () => {
    axios({
      method: "post",
      url: `http://localhost:9191/addComment`,
      data: {
        "product_id": product_id,
        "star": star,
        "comment": comment,
        "name" : user.fullname,
      }
    })
      .then((res) => { alert("Đánh giá thành công")
      })
      .catch((err) => {
        console.log(err);
      });
    };
  
    const checkColor = () => {
      if(check==false)
        return 0.4
      else
        return 1
    }
  return (
    <>
      <div className="billReview">
        <span>Đánh giá sao:</span>
        <input
          className="review-rating"
          placeholder="5"
          onChange={(e) => setStar(Number(e.target.value))}
        />

        <span>Đánh giá sản phẩm:</span>
        <input
          className="review-rating"
          placeholder="Sap pham tuyet voi"
          onChange={(e) => setComment(e.target.value)}
        />

      </div>
      <button className="btn btn-lg btn-default md-btn-flat mt-2 mr-3 btn-color-yellow"style={{opacity:checkColor()}} onClick={() => {
        if(check){
          addComment()
          setCheck(false)
        }
          else {
            alert("Đã đánh giá")
          }
      }
        
        }>Đánh giá</button>
    </>
  )
}