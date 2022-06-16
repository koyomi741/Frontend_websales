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
  const [productBill, setProductBill] =  useState<TypeOf_BillProducts[]>([]);
  useEffect(() => {
    getApi("http://localhost:9191/billProducts");
  }, []);

  const getApi = (Url : String) => {
    axios({
      method: "get",
      url: Url +"",
      data: null,
    })
      .then((res) => {
        setProductBill(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const SumOf_
  return (
    <div className="container">
      <h1 className="h1-st1" >Thống kê doanh thu theo sản phẩm</h1>
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
                <th>Tổng tiền sau khuyến mãi</th>
              </tr>
            </thead>
            <tbody>
              {
                productBill.map((pb) => (
                  <ShowProductBill pb={pb} />
                ))
              }
            </tbody>
          </table>
          </div>
    </div>
  );
};

type props = {
  pb : TypeOf_BillProducts
}
const ShowProductBill = ({pb} : props) => (
  <tr>
    <td >{pb.id+""}</td>
    <td >{pb.product.id+""}</td>
    <td >{pb.product.nameProduct}</td>
    <td >{pb.product.model}</td>
    <td >{pb.product.price+""}</td>
    <td >{pb.bill.client_id+""}</td>
    <td >{pb.quatity +""}</td>
    <td >{pb.unitPrice+""}</td>

  </tr>
)
