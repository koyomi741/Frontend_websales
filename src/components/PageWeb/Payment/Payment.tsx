import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Navbar/Navbar';
import Footer from '../Store/Footer';
import "./Payment.css"


type CartProduct = {
  id: number,
  client_id: number,
  user: {
    id: number,
    fullname: string,
    dob: string,
    gender: string,
    phone: string,
    address: string,
    username: string,
    password: string,
    isAdmin: number,
    note: string,

  },
  product_id: number,
  product: {
    id: number,
    nameProduct: string,
    model: string,
    image: string,
    price: number,
    describes: string,
    color: string,
  }
  size_id: number,
  size: {
    id: number,
    size: string
  }
  extraDate: String,
  quatity: number,
}

type BillProduct = {
  product_id: number;
  quatity: number;
  unitPrice: number;
}
const productSizeType = {
  "id": 1,
  "product_id": 1,
  "product": {
    "id": 1,
    "nameProduct": "Áo thun đỏ đơn giản",
    "model": "Áo",
    "image": "https://firebasestorage.googleapis.com/v0/b/test-62604.appspot.com/o/img1.jpg?alt=media&token=00b86012-129f-4885-8033-77655cf76e03",
    "price": 150000,
    "describes": "Chất liệu vải cốt tông, mặc thoải mái",
    "color": "Đỏ"
  },
  "size_id": 1,
  "size": {
    "id": 1,
    "size": "S"
  },
  "quantity": 10
}
type ProductSizes = {
  id: number,
  product_id: number,
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
    id: number,
    size: String,
  },
  quantity: number,
}

export default function Payment() {

  const navigate = useNavigate();

  const { user, setUser } = useAppContext();
  const { idBill, setIdBill } = useAppContext();

  const [carts, setCarts] = useState<CartProduct[]>([]);
  // const [billId, setBillId] = useState(0);

  const [infoPayment, setInfoPayment] = useState("online");
  const checkInfoPayment = (data: string) => {
    if (infoPayment == data)
      return 'orange'
    else
      return 'white'
  }

  // date time
  var showDate = new Date();
  var date = showDate.getDate() + "/" + (showDate.getMonth() + 1) + "/" + showDate.getFullYear();
  var dateTime = showDate.getHours() + ":" + showDate.getMinutes() + ":" + showDate.getSeconds();

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
  

  //=================================================================
  const [modalBank, setModaBank] = useState(true)
  const [bank, setBank] = useState("VCB")
  const listBank = ["VCB", "AGRI", "VPBANK", "OceanBank", "Techcombank", "MB", "NCB"]

  const checkBank = (data: String) => {
    if (data == bank)
      return "orange"
    else return "white"
  }

  //===============================================================
  // lấy thông tin sản phẩm có trong cart
  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = () => {
    axios({
      method: "get",
      url: "http://localhost:9191/cartByClientId/" + user.id,
      data: null,
    })
      .then((res) => {
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //==================================================================

  const AddBill = () => {
    axios({
      method: "post",
      url: `http://localhost:9191/addBill`,
      data: {
        "client_id": user.id,
        "datePayment": showDate.getHours() + ":" + showDate.getMinutes() + ":" + showDate.getSeconds() + " " + showDate.getDate() + "/" + (showDate.getMonth() + 1) + "/" + showDate.getFullYear(),
        "infoPayment": infoPayment
      },
    })
      .then((res) => {
        setIdBill(res.data.id)
        AddManyBillProduct(res.data.id)
      })
      .catch((err) => { console.log(err); });
  }

  const AddBillProduct = (billId: number, product_id: number, quatity: number, unitPrice: number) => {
    axios({
      method: "post",
      url: `http://localhost:9191/addBillProduct`,
      data: {
        "bill_id": billId,
        "product_id": product_id,
        "quatity": quatity,
        "unitPrice": unitPrice,
      },
    })
      .then((res) => { })
      .catch((err) => { console.log(err); });
  }

  const AddManyBillProduct = (id: number) => {
    for (let i = 0; i < carts.length; i++) {
      AddBillProduct(id, carts[i].product_id, carts[i].quatity, Price_SaleOf(carts[i].product.model ,carts[i].product.price) * carts[i].quatity )
      get_ProductSize(carts[i].product_id, carts[i].size_id, carts[i].quatity);
    }
    DeleteAllCartByClientId();
    navigate("payDone")
    // giam so luong san pham trong kho

    //==============================
    alert("Thanh toan thanh cong")
  }

  //==================================================================

  const DeleteAllCartByClientId = () => {
    axios({
      method: "delete",
      url: `http://localhost:9191/deleteAllCart/` + user.id,
      data: null,
    })
      .then((res) => { })
      .catch((err) => { console.log(err); });
  }
  // ================================================================
  // lay ra productSize
  var productSize_id = 0;
  var productSize_quantity = 0;
  // product_id + size_id
  const get_ProductSize = (product_id: number, size_id: number, quantity: number) => {
    axios({
      method: "post",
      url: "http://localhost:9191/productSizeByProductIdAndSizeId",
      data: {
        "product_id": product_id,
        "size_id": size_id
      }
    })
      .then((res) => {
        update_quantity_ProductSize(res.data.id, res.data.quantity, quantity)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // giam so luong
  const update_quantity_ProductSize = (id: number, shop_quantity: number, product_quantity: number) => {

    axios({
      method: "put",
      url: "http://localhost:9191/updateProductSize",
      data: {
        "id": id,
        "quantity": (shop_quantity - product_quantity),
      }
    })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div id="body-payment" className='container'>
        <h2 className='payment-header'>Hóa Đơn</h2>
        <div className="payment-user">
          <h3>Họ và tên: {user.fullname}</h3>
          <p>Địa chỉ: {user.address}</p>
          <p>Số điện thoại: {user.phone}</p>
          <p >
            <span style={{backgroundColor: "yellow", fontSize: 20, fontStyle: 'italic'}}>Khuyến Mãi Sốc:</span>  
            <span style={{fontWeight: "bold"}}> Giảm {promotion} % cho đơn hàng từ 1 triệu đồng </span>
          </p>
        </div>
        <div className='payment-table'>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Loại</th>
                <th>Tổng tiền</th>
                <th>Màu</th>
              </tr>
            </thead>
            <tbody>
              {
                carts.map((cart, index) => (
                  <ProductInCart cart={cart} index={index} />
                ))
              }
            </tbody>
          </table>
        </div>
        
        <div className="d-flex total-payment" style={{justifyContent: 'end'}}>
                <div className="text-right mt-4 mr-8">
                  <label className="text-muted font-weight-normal m-0">Giảm giá</label>
                  <div className="text-large"><strong>{discountMoney}</strong></div><br></br>
                </div>
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">Tổng giá</label>
                  <div className="text-large"><strong>{Total}Đ</strong></div>
                </div>
        </div>

        <div className="payment-method">
          <h2 className='payment-method-header'>
            Phương thức thanh toán
          </h2>
          <div className="payment-btn">
            <button className="bttn" style={{ backgroundColor: checkInfoPayment("online") }}
              onClick={() => { setInfoPayment("online"); setModaBank(!modalBank) }}
            >
              Thanh toán quan tài khoản ngân hàng
            </button>

            <button className="bttn" style={{ backgroundColor: checkInfoPayment("offline") }}
              onClick={() => { setInfoPayment("offline"); setModaBank(false) }}
            >
              Thanh toán khi nhận hàng
            </button>
          </div>

          {
            modalBank ?
              <div className='payment-modal'>
                <h3>Chọn ngân hàng</h3>
                <div className="payment-modal-bank">
                  {
                    listBank.map((bank) => (
                      <button className="bttn"
                        style={{ backgroundColor: checkBank(bank) }}
                        onClick={() => setBank(bank)}
                      >{bank}</button>
                    ))
                  }

                </div>
              </div>
              :
              <></>
          }
        </div>

        <div className='payment-time'>
          <span>Thời gian: {dateTime + " " + date}</span>
        </div>

        <button className="btn btn-lg btn-primary mt-2" onClick={() => (AddBill())}>Thanh toán</button>

      </div>
      <Footer />
    </>
  )
}

type props = {
  cart: CartProduct
  index: number
}

// hien thong tin san pham trong hooa don
// const ProductInCart = ({ cart, index }: props) => (
  // <tr>
  //   <td>{index + 1}</td>
  //   <td>
  //     <img src={cart.product.image} className="cartImage" />
  //   </td>
  //   <td>{cart.product.nameProduct}</td>
  //   <td>{cart.product.price}</td>
  //   <td>{cart.quatity}</td>
  //   <td>{cart.product.model}</td>
  //   <td>{cart.product.price * cart.quatity}</td>
  //   <td>{cart.product.color}</td>
  // </tr>
// )

const ProductInCart = ({ cart, index }: props) => {
  // giam gia
  const {saleOf_Shirt, setSaleOf_Shirt}= useAppContext();
  const {saleOf_Shoes, setSaleOf_Shoes}= useAppContext();
  const {saleOf_Watch, setSaleOf_Watch}= useAppContext();

  const Price_SaleOf = (model: String, price: number) => {
    if(model == "Áo")
      return price * (100 - saleOf_Shirt) / 100;
    if(model == "Giày")
      return price * (100 - saleOf_Shoes) / 100;
    if(model == "Đồng hồ")
      return price * (100 - saleOf_Watch) / 100;
    return price;
  }
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
    <tr>
      <td>{index + 1}</td>
      <td>
        <img src={cart.product.image} className="cartImage" />
      </td>
      <td>{cart.product.nameProduct}</td>
      <td>{StylePrice(Price_SaleOf(cart.product.model,cart.product.price))}đ</td>
      <td>{cart.quatity}</td>
      <td>{cart.product.model}</td>
      <td>{StylePrice(Price_SaleOf(cart.product.model,cart.product.price) * cart.quatity)}đ</td>
      <td>{cart.product.color}</td>
    </tr>
  )
}