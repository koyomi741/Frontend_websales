import React from "react";
import './Store.css';
import { FaShippingFast, FaTiktok, FaFacebook, FaInstagram, FaPinterest, FaInvision } from "react-icons/fa";
import { SiFastapi } from "react-icons/si";
import { GiTrophyCup } from "react-icons/gi";
import { MdLocationOn} from "react-icons/md";
import { BsTelephoneFill} from "react-icons/bs";
import { CgMail} from "react-icons/cg";
export default () => {
    return(
        <div id="footerSection">
        <div className="footerContainer">
          <div className="footerContact">
            <h3 className="footerTitle">Liên hệ</h3>
            <div className="contactContent">
              <a href="" className="contactText">
                <MdLocationOn color="#fff" size={20}/> 
                <span className="contactSpan">PTIT, Hà Đông, Hà Nội</span>
              </a>

              <a href="" className="contactText">
                <BsTelephoneFill color="#fff" size={20}/> 
                <span className="contactSpan">+0123456789</span>
              </a>

              <a href="" className="contactText">
                <CgMail color="#fff" size={20}/> 
                <span className="contactSpan">ltw@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="footerContact">
            <h3 className="footerTitle">Giới thiệu</h3>
            <p>Cảm ơn bạn đã ghé thăm Websales của chúng tôi. Hãy ghé thăm gian hàng và theo dõi fanpage để có trải nghiệm thật tốt các sản phẩm shop chúng tôi nhé!</p>
            <div className="boxIcon">
              <div className="footerIcon">
                <a href="https://www.facebook.com/anuj.kumarsaxena.5/" target="blank_"></a>
                <FaFacebook size={30}/>
               
              </div>
              <div className="footerIcon">
                <FaInstagram size={30}/>
              </div>
              <div className="footerIcon">
                <FaInvision size={30}/>
              </div>
              <div className="footerIcon">
                <FaPinterest size={30}/>
              </div>
              <div className="footerIcon">
                <FaTiktok size={30}/>
              </div>
            </div>
          </div>
        </div>

        <div className="footerInfo">
          <div className="footerLine"/>
          <p>© 2022 Học viện Công Nghệ Bưu Chính Viễn Thông</p>
          <p>Chi nhánh tại Hà Nội</p>
        </div>
      </div>
    );
}