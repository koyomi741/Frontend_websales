import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StringDecoder } from "string_decoder";
import { useAppContext } from "../../Navbar/Navbar";
import Footer from "../Store/Footer";
import "./Cart.css";


type TypeOf_Cart = {
  id: number,
  client_id: number,
  user: {
      id: number,
      fullname: String,
      dob: String,
      gender: String,
      phone: String,
      address: String,
      username: String,
      password: String,
      isAdmin: number,
      note: String,
  },
  product_id: number,
  product: {
      id: number,
      nameProduct: String,
      model: String,
      image: String,
      price: number,
      describes: String,
      color: String,
  },
  size_id: number,
  size: {
    id: number,
    size: String
  },
  extraDate: String,
  quatity: number,
}
export default () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState<TypeOf_Cart[]>([])
  const { user, setUser } = useAppContext();
  const [idC, setIdC] = useState(0);
  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = () => {
    axios({
      method: "get",
      url: "http://localhost:9191/cartByClientId/"+user.id,
      data: null,
    })
      .then((res) => {
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteCartById = (Id : Number) => {
    axios({
    method: "delete",
    url: "http://localhost:9191/deleteCart/" + Id,
    data: null
  })
    .then((res) => {
        alert("Đã xóa khỏi giỏ hàng")
        getAPI();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  //======================================================================
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
  const {saleOf_Shirt, setSaleOf_Shirt}= useAppContext();
  const {saleOf_Shoes, setSaleOf_Shoes}= useAppContext();
  const {saleOf_Watch, setSaleOf_Watch}= useAppContext();

  const checkSale = (model: String) => {
    if(model == "Áo")
      return saleOf_Shirt+"%";
    if(model == "Giày")
      return saleOf_Shoes+"%";
    if(model == "Đồng hồ")
      return saleOf_Watch+"%";
  }
  const Price_SaleOf = (model: String, price: number) => {
    if(model == "Áo")
      return price * (100 - saleOf_Shirt) / 100;
    if(model == "Giày")
      return price * (100 - saleOf_Shoes) / 100;
    if(model == "Đồng hồ")
      return price * (100 - saleOf_Watch) / 100;
    return price;
  }

  //=================================================================
  const {promotion, setPromotion} = useAppContext();

  // Tính tổng tiền
  var Total = 0;
  for( let i = 0; i < carts.length; i++){
    Total += Price_SaleOf(carts[i].product.model ,carts[i].product.price) * carts[i].quatity
  }
  var discountMoney = 0;
  if( Total > 1000000) {
    discountMoney = Total * promotion / 100;
    Total -= discountMoney;
  }
  

  return (
    <>
    <div className="container px-3 my-5 clearfix">
    
    <div className="card">
        <div className="card-header">
            <h2>Giỏ hàng của bạn</h2>
            <p >
              <span style={{backgroundColor: "yellow", fontSize: 20, fontStyle: 'italic'}}>Khuyến Mãi Sốc:</span>  
              <span style={{fontWeight: "bold"}}> Giảm {promotion} % cho đơn hàng từ 1 triệu đồng </span>
            </p>
        </div>
        <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    
                    <th className="text-center py-3 px-4">Tên sản phẩm &amp; Chi tiết</th>
                    <th className="text-right py-3 px-4">Đơn giá</th>
                    <th className="text-center py-3 px-4" style={{width: "120px"}}>Số lượng</th>
                    <th className="text-right py-3 px-4">Tổng giá</th>
                    <th className="text-center align-middle py-3 px-0" style={{width: "80px"}}><a href="#" className="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i className="ino ion-md-trash"></i></a></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    carts.map((cart) => 
                      <tr>
                        <td className="p-4">
                          <div className="media align-items-center">
                            <img src={String(cart.product.image)} className="d-block ui-w-40 ui-bordered mr-4" />
                            <div className="media-body">
                              <a href="#" className="d-block text-dark">{cart.product.nameProduct}</a>
                              <small>
                                <span className="text-muted">Màu: </span>{cart.product.color} <br/>
                                <span className="text-muted">Size: </span>{cart.size.size} <br/>
                                <span className="text-muted">{cart.product.describes}</span> <br/>
                                <span className="text-muted">Ngày thêm: </span>{cart.extraDate}<br/>
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">{StylePrice(Price_SaleOf(cart.product.model,cart.product.price))}Đ</td>
                        <td className="align-middle p-4"><input type="number" className="form-control text-center" value={cart.quatity}></input></td>
                        <td className="text-right font-weight-semibold align-middle p-4">{StylePrice(Price_SaleOf(cart.product.model,cart.product.price) * cart.quatity)}Đ</td>
                        <td className="text-center align-middle px-0"><button className="btn-remove shop-tooltip close float-none text-danger"  onClick={() => (DeleteCartById (cart.id))}>×</button></td>
                      </tr>
                    )
                  }
                  
  
                </tbody>
              </table>
            </div>
          
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="mt-4">
                <label className="text-muted font-weight-normal">Promocode</label>
                <input type="text" placeholder="ABC" className="form-control"></input>
              </div>
              <div className="d-flex total-payment">
                <div className="text-right mt-4 mr-8">
                  <label className="text-muted font-weight-normal m-0">Giảm giá</label>
                  <div className="text-large"><strong>{StylePrice(discountMoney)}Đ</strong></div><br></br>
                </div>
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">Tổng giá</label>
                  <div className="text-large"><strong>{StylePrice(Total)}Đ</strong></div>
                </div>
              </div>
            </div>
        
        
            <div className="float-right total-payment-btn">
              <button type="button" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3 btn-color-yellow" onClick={() => navigate("/product")}>Tiếp tục shopping</button>
              <button type="button" className="btn btn-lg btn-primary mt-2" onClick={() => navigate("/payment")}>Thanh toán</button>
            </div>
        
          </div>
      </div>
  </div>
  <Footer/>
  </>
  );
};

