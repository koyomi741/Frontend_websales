import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

type item = {
  selectedIndex: number;
  e: () => void;
};

export default () => {
  return (
    <div className="slider">
      <Carousel className="slide-container">

      <Carousel.Item interval={1500}>
          <div className="slide-item">
            <div className="slide-image">
              <img
                className="d-block w-100"
                src={require("./../../../images/background/bg6.jpg")}
                alt="Image One"
              />
            </div>
            <Carousel.Caption>
              <div className="slide-content">
                <h3>Chào mừng khách hàng đến với Websales</h3>
                <p>Thời trang chúng tôi tạo ra với mong muốn đem lại sự cân bằng giữa phong cách bên ngoài và sự thoải mái bên trong, toát lên sự gần gửi, trẻ trung cho quý khách hàng </p>
                <button className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/product';
                  }}
                > Show Now</button>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        <Carousel.Item interval={1500}>
          <div className="slide-item">
            <div className="slide-image">
              <img
                className="d-block w-100"
                src={require("./../../../images/background/bg8.jpg")}
                alt="Image One"
              />
            </div>
            <Carousel.Caption>
              <div className="slide-content">
                <h3>T shirt</h3>
                <p>Chất liệu vải cotton, mềm mại và thoải mái cho quý khách hàng khi mặc.</p>
                <button className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/product/shirt';
                  }}
                > Show Now</button>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        <Carousel.Item interval={1500}>
          <div className="slide-item">
            <div className="slide-image">
              <img
                className="d-block w-100"
                src={require("./../../../images/background/bg4.jpg")}
                alt="Image One"
              />
            </div>
            <Carousel.Caption>
              <div className="slide-content">
                <h3>Shoe</h3>
                <p>Những đôi giày nâng bước chân quý khách lên một tầm cao mới.</p>
                <button className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/product/shoe';
                  }}
                > Show Now</button>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        <Carousel.Item interval={1500}>
          <div className="slide-item">
            <div className="slide-image">
              <img
                className="d-block w-100"
                src={require("./../../../images/background/bg3.jpg")}
                alt="Image One"
              />
            </div>
            <Carousel.Caption>
              <div className="slide-content">
                <h3>Watch</h3>
                <p>Đồng hồ Thụy Sỹ cao cấp, chính hãng, mang đậm chất thanh lịch và nam tính.</p>
                <button className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/product/watch';
                  }}
                > Show Now</button>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        <Carousel.Item interval={1500}>
          <div className="slide-item">
            <div className="slide-image">
              <img
                className="d-block w-100"
                src={require("./../../../images/background/bg7.jpg")}
                alt="Image One"
              />
            </div>
            <Carousel.Caption>
              <div className="slide-content">
                <h3>Luôn luôn đảm bảo chất lượng và sự thanh lịch!</h3>
                <p>Để tận hưởng những khoảnh khắc tuyệt vời, hãy đến với Websales.</p>
                <button className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/store';
                  }}
                > Read more</button>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

      </Carousel>
    </div>
  );
};
