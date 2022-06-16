import React from "react";
import { useAppContext } from "../Navbar/Navbar";
import Bill from "../PageWeb/Bill/Bill";
import "./User.css";

export default () => {
 const {user, setUser} = useAppContext();
  return (
   
<div className="container">
 <div className="row">
		<div className="">
			
			<div className="my-5">
				<h2 className="payment-header">Tài khoản của bạn</h2>
			
			</div>
		
			<form className="file-upload">
				<div className="row mb-8 gx-10">
				
					<div  className="col-xxl-4" >
						<div className="bg-secondary-soft  px-4 py-5 rounded">
							<div className="row g-3">
								<h4 className="mb-4 mt-0">Thông tin tài khoản của bạn</h4>
							
								<div className="col-md-6">
									<label className="form-label">Tên tài khoản</label>
									<input type="text" className="form-control" placeholder="" aria-label="First name" value={user.fullname}></input>
								</div>
								
								<div className="col-md-6">
									<label className="form-label">Số điện thoại</label>
									<input type="text" className="form-control" placeholder="" aria-label="Last name" value={user.phone}></input>
								</div>
								
								<div className="col-md-12">
									<label className="form-label">Địa chỉ</label>
									<input type="text" className="form-control" placeholder="" aria-label="Phone number" value={user.address}></input>
								</div>
								
								<div className="col-md-6">
									<label className="form-label">Giới tính</label>
									<input type="text" className="form-control" placeholder="" aria-label="Phone number" value={user.gender}></input>
								</div>
								
								<div className="col-md-6">
									<label className="form-label">Ngày sinh</label>
									<input type="email" className="form-control" id="inputEmail4" value={user.dob}></input>
								</div>
							
								
							</div> 
						</div>
					</div>
				

					<div className="col-xxl-8">
						<div className="bg-secondary-soft px-6 py-8 rounded">
							<div className="row g-3" style={{marginTop: 0, paddingTop: 15}}>
								<Bill/>
							</div>
						</div>
					</div>
				</div>
			</form> 
		</div>
	  </div>
   </div>
  );
};
