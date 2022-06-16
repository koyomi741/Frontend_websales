import axios from "axios";
import React, { useEffect, useState } from "react";


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

export default () => {
  const [productBill, setProductBill] = useState<TypeOf_BillProducts[]>([]);

  useEffect(() => {
    getApi("http://localhost:9191/billProducts");
  }, []);

  const getApi = (Url: String) => {
    axios({
      method: "get",
      url: Url + "",
      data: null,
    })
      .then((res) => {
        setProductBill(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const [showModel, setShowModel] = useState("Tất cả");
  const checkColor = (data: String) => {
    if (data == showModel)
      return "#f6de04";
    else return "#fff"
  }
  // doanh so
  let quantity_all = 0;
  let quantity_shirt = 0;
  let quantity_shoes = 0;
  let quantity_watch = 0;
  let money_all = 0;
  let money_shirt = 0;
  let money_shoes = 0;
  let money_watch = 0;

  for (let i = 0; i < productBill.length; i++) {
    if (productBill[i].product.model == "Áo") {
      quantity_shirt += Number(productBill[i].quatity)
      money_shirt += Number(productBill[i].unitPrice)
    }
    if (productBill[i].product.model == "Giày") {
      quantity_shoes += Number(productBill[i].quatity)
      money_shoes += Number(productBill[i].unitPrice)
    }
    if (productBill[i].product.model == "Đồng hồ") {
      quantity_watch += Number(productBill[i].quatity)
      money_watch += Number(productBill[i].unitPrice)
    }
    quantity_all += Number(productBill[i].quatity)
    money_all += Number(productBill[i].unitPrice)
  }
  const check_doanh_so = () => {
    if (showModel == "Tất cả")
      return quantity_all
    if (showModel == "Áo")
      return quantity_shirt
    if (showModel == "Giày")
      return quantity_shoes
    if (showModel == "Đồng hồ")
      return quantity_watch
  }
  const check_doanh_thu = () => {
    if (showModel == "Tất cả")
      return StylePrice(money_all)
    if (showModel == "Áo")
      return StylePrice(money_shirt)
    if (showModel == "Giày")
      return StylePrice(money_shoes)
    if (showModel == "Đồng hồ")
      return StylePrice(money_watch)
  }

  // =========================================
  const StylePrice = (price: number) => {
    let num = price + ""
    let s = "";
    for (let i = 0; i < num.length; i++) {
      s = num[num.length - 1 - i] + s;

      if ((i + 1) % 3 == 0 && i != (num.length - 1)) {
        s = "." + s;
      }
    }
    return s;
  }
  //===========================================
  return (
    <div className="container">
      <button className="bttn" style={{marginLeft: 10, marginRight: 10, marginBottom: 10, backgroundColor: checkColor("Tất cả") }} onClick={() => setShowModel("Tất cả")}>Tất cả</button>
      <button className="bttn" style={{marginLeft: 10, marginRight: 10, marginBottom: 10, backgroundColor: checkColor("Áo") }} onClick={() => setShowModel("Áo")}>Áo</button>
      <button className="bttn" style={{marginLeft: 10, marginRight: 10, marginBottom: 10, backgroundColor: checkColor("Giày") }} onClick={() => setShowModel("Giày")}>Giày</button>
      <button className="bttn" style={{marginLeft: 10, marginRight: 10, marginBottom: 10, backgroundColor: checkColor("Đồng") }} onClick={() => setShowModel("Đồng hồ")}>Đồng hồ</button>

      <h1 className="h1-st1">Thống kê doanh thu theo sản phẩm</h1>
      <h3>Doanh số bán: {check_doanh_so()} sản phẩm</h3>
      <h3>Tổng doanh thu: {check_doanh_thu()} Đ</h3>
      <div className="table-product">
        <table>
          <thead>
            <tr>
              <th>ID đơn hàng</th>
              <th>ID sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Loại sản phẩm</th>
              <th>Giá bán</th>
              <th>ID khách hàng</th>
              <th>Số lượng mua</th>
              <th>Thời gian mua</th>
              <th>Tổng tiền sau khuyến mãi</th>
            </tr>
          </thead>
          <tbody>
            {
              productBill.map((pb) => (
                <ShowProductBill pb={pb} showModel={showModel} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

type props = {
  pb: TypeOf_BillProducts
  showModel: String
}
const ShowProductBill = ({ pb, showModel }: props) => {
  // điều kiện show tât cả
  if (showModel == "Tất cả")
    return (
      <tr>
        <td >{pb.id + ""}</td>
        <td >{pb.product.id + ""}</td>
        <td >{pb.product.nameProduct}</td>
        <td >{pb.product.model}</td>
        <td >{pb.product.price + ""}</td>
        <td >{pb.bill.client_id + ""}</td>
        <td >{pb.quatity + ""}</td>
        <td >{pb.bill.datePayment + ""}</td>
        <td >{pb.unitPrice + ""}</td>
      </tr>
    )
  else {
    if (pb.product.model == showModel)
      return (
        <tr>
          <td >{pb.id + ""}</td>
          <td >{pb.product.id + ""}</td>
          <td >{pb.product.nameProduct}</td>
          <td >{pb.product.model}</td>
          <td >{pb.product.price + ""}</td>
          <td >{pb.bill.client_id + ""}</td>
          <td >{pb.quatity + ""}</td>
          <td >{pb.bill.datePayment + ""}</td>
          <td >{pb.unitPrice + ""}</td>
        </tr>
      )
    else {
      return (<></>)
    }
  }
}
