import React from "react";
import './Store.css';
import { FaShippingFast, FaTiktok, FaFacebook, FaInstagram, FaPinterest, FaInvision } from "react-icons/fa";
import { SiFastapi } from "react-icons/si";
import { GiTrophyCup } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import Footer from "./Footer";
import { IoReturnDownBackSharp } from "react-icons/io5";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";


export default () => {
  return (
    <div >
      {/* header */}
      {/* <div id="headerSection">
        <h1 className="storeName">Blog List</h1>
      </div> */}

      {/* body */}
      <div id="bodyAbout">
        <div className="bodyContainer">


          <section className="about">
            <h2><span>About</span> Us </h2>

            <div className="flex">

              <div className="image">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/279701716_372329374847995_6000396881842539323_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=aee45a&_nc_ohc=eY9fCSud_dYAX9pO5pH&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJdKQu6TT8RmA9k5b-lmfNeIjbuOSBbm2e5c_10htuxDQ&oe=62A21349" alt="" />
              </div>

              <div className="content">
                <h3>Giao hàng nhanh chóng!</h3>
                <p>Miễn phí vận chuyển từ đơn hàng 1000k.</p>
                <a href="/product" className="bttn btn-about">Mua ngay</a>
              </div>

            </div>

            <div className="flex">

              <div className="content">
                <h3>Mua hàng mọi lúc mọi nơi!</h3>
                <p>Thỏa sức mua sắm tại nhà hay bất cứ đâu.</p>
                <a href="/product" className="bttn btn-about">Đặt hàng</a>
              </div>

              <div className="image">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/279426586_389962819701248_6710636866104111700_n.jpg?_nc_cat=104&ccb=1-6&_nc_sid=aee45a&_nc_ohc=P4pDS0DtGfEAX9X8wZr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVKMWbSen-CMJJbdpffseWWe2ozyYuwbDJpNBOKGOMqxxA&oe=629F64FF" alt="" />
              </div>

            </div>

            <div className="flex">

              <div className="image">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/279519543_2952121745078683_3518742302561360033_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=aee45a&_nc_ohc=wffzyeoo2fkAX8oMW9x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIyi9YsME6r6ET0kpOA--KFu3I-vMu9QSw0zMvYN5DoBw&oe=62A13A5A" alt="" />
              </div>

              <div className="content">
                <h3>Nhận xét về chúng tôi</h3>
                <p>Cùng xem những đánh giá từ những khách hàng đã mua sản phẩm từ Websales.</p>
                <a href="#reviews" className="bttn btn-about">Đánh giá khách hàng</a>
              </div>

            </div>

          </section>

          <section className="reviews" id="reviews">

            <h2> Customer <span>Review</span></h2>

            <div className="box-container">

              <div className="box">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/249386732_411400537221234_9121079303906901903_n.png?_nc_cat=109&ccb=1-6&_nc_sid=aee45a&_nc_ohc=t5QUgiz5xqIAX-LtUA0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJmx3gT7hq8paNMhFcbWHlHFD1rihsBoCIV8JVxS4BWng&oe=629FB282" alt="" />
                <p>Giao hàng nhanh, sản phẩm chất lượng.</p>
                <div className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
                <h3>Dũng</h3>
              </div>

              <div className="box">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/247281883_317531026374337_6507242744470794683_n.png?_nc_cat=109&ccb=1-6&_nc_sid=aee45a&_nc_ohc=KtSUqN53UVAAX8V6MZI&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIzHKEljhf-BAP5QrX1E3klH7U8hYiwOgs7atzxN1nadA&oe=629E8022" alt="" />
                <p>Giao hàng nhanh, sản phẩm chất lượng.</p>
                <div className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
                <h3>Dũng</h3>
              </div>

              <div className="box">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/247587972_1166945924041905_5624535196774893258_n.png?_nc_cat=105&ccb=1-6&_nc_sid=aee45a&_nc_ohc=8TxDvjCGnP4AX81KKB6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVK-faDN3MRtpaWyRNgR7C2sW4EYTsesjds9Sb6BMhq5xg&oe=629F8076" alt="" />
                <p>Giao hàng nhanh, sản phẩm chất lượng.</p>
                <div className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
                <h3>Dũng</h3>
              </div>

              <div className="box">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/256307504_438757114305437_1375295617749299593_n.png?_nc_cat=106&ccb=1-6&_nc_sid=aee45a&_nc_ohc=y_unlbtbP8cAX9mDMzj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLf1cgMiB0c2_Sd3gwUbGXJB0PVZr4PcFU66uBT9sCEsQ&oe=62A13D59" alt="" />
                <p>Giao hàng nhanh, sản phẩm chất lượng.</p>
                <div className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
                <h3>Dũng</h3>
              </div>

              <div className="box">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/260433601_307869101013081_6604856197829911562_n.png?_nc_cat=111&ccb=1-6&_nc_sid=aee45a&_nc_ohc=8H8c2TuTT_UAX83hpc7&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLQ3S12Zlim_PIzjL6jRs_Iy--qNw5lWtt2hOsIpdN2jg&oe=629FBCAA" alt="" />
                <p>Giao hàng nhanh, sản phẩm chất lượng.</p>
                <div className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
                <h3>Dũng</h3>
              </div>

              <div className="box">
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/259825943_308055700992513_5827878464123279811_n.png?_nc_cat=104&ccb=1-6&_nc_sid=aee45a&_nc_ohc=KCXY-MlMSIsAX_Bvtu3&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLkFguvu6e1FXD7wKe_iQezxTORFJxE2B7HDz59q8oD8w&oe=629F9A1E" alt="" />
                <p>Giao hàng nhanh, sản phẩm chất lượng.</p>
                <div className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
                <h3>Dũng</h3>
              </div>

            </div>

          </section>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

// header - body - footer