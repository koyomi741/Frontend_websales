import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import "./Bill.css"

const BillProduct = {
    "id": 1,
    "bill_id": 2,
    "bill": {
        "id": 2,
        "client_id": 1,
        "user": {
            "id": 1,
            "fullname": "Lý Mạnh Huy",
            "dob": "07/04/2001",
            "gender": "Nam",
            "phone": "0123456",
            "address": "Hưng yên",
            "username": "a",
            "password": "a",
            "isAdmin": 0,
            "note": "ádfasdfasdf"
        },
        "datePayment": "5/5/2022",
        "infoPayment": "abc"
    },
    "product_id": 30,
    "product": {
        "id": 30,
        "nameProduct": "Áo thun xanh nước biển có hình nhân vật",
        "model": "Áo",
        "image": "https://firebasestorage.googleapis.com/v0/b/test-62604.appspot.com/o/img30.jpg?alt=media&token=fdd80f5a-18e6-48b0-928a-aa204b7215f4",
        "price": 200000,
        "describes": "Chất liệu vải mềm, mặc thoải mái",
        "color": "Xanh"
    },
    "quatity": 2,
    "unitPrice": 120000
}


export default () => {

    const [billProduct, setBillProduct] = useState([BillProduct])

    useEffect(() => {
        getBillProduct();
      }, []);

      const getBillProduct = () => {
        axios({
          method: "get",
          url: `http://localhost:9191/billProducts`,
          data: null,
        })
          .then((res) => {
            setBillProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };      

      console.log(billProduct);
      
  return (

    <div>
        <h4 style={{marginBottom: 20}} >Hóa đơn</h4>
        <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    
                    <th className="text-center py-3 px-4">Tên sản phẩm &amp; Chi tiết</th>
                    <th className="text-right py-3 px-4">Đơn giá</th>
                    <th className="text-center py-3 px-4" style={{width: "120px"}}>Số lượng</th>
                    <th className="text-right py-3 px-4">Tổng giá</th>
                    <th className="text-right py-3 px-4">Ngày mua</th>
                 </tr>
                </thead>
                <tbody>
                  {
                    billProduct.map((bill) => 
                      <tr>
                        <td className="p-4">
                          <div className="media align-items-center">
                            <img src={bill.product.image} className="d-block ui-w-40 ui-bordered mr-4" alt=""></img>
                            <div className="media-body">
                              <a href="#" className="d-block text-dark">{bill.product.nameProduct}</a>
                              <small>
                                <span className="text-muted">Màu: </span>{bill.product.color} <br/>

                                <span className="text-muted">{bill.product.describes}</span> <br/>
                               
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">{bill.product.price}Đ</td>
                        <td className="align-middle p-4"><input type="number" className="form-control text-center" value={bill.quatity}></input></td>
                        <td className="text-right font-weight-semibold align-middle p-4">{bill.unitPrice}Đ</td>
                        <td className="text-right font-weight-semibold align-middle p-4">{bill.bill.datePayment}</td>
                      </tr>
                    )
                  }
                  
  
                </tbody>
              </table>
            </div>

       

    </div>
  );
};
