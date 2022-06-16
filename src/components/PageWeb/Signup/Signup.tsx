import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useAppContext } from "../../Navbar/Navbar";

type user = {
  id: number;
  fullname: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  username: string;
  password: string;
  isAdmin: number;
  note: string;
};

export default () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  // const {user, setUser} = useAppContext()
  const {u, setU} = useAppContext();
  const checkUserName = () => {
    axios({
      method: "get",
      url: `http://localhost:9191/userByUsername/${username}`,
      data: null,
    })
      .then((res) => {
        // setUser(res.data);     
        setU(res.data);
        if(res.data.length != 0) 
          alert("Tai khoan da ton tai")
        else {
          addUserName()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CheckSignup = () => {
    if(
      username == "" ||
      password == "" ||
      confirmPassword == "" ||
      fullname == "" ||
      dob == "" ||
      gender == "" ||
      phone == "" ||
      address == "" 
    )
      alert("Khong duoc bo trong")
    else if (password != confirmPassword)
      alert("Mat khau khong trung khop")
    else {
      checkUserName()
      return true;
    }
    return false;
  }
  
  const addUserName = () => {
    axios({
      method: "post",
      url: `http://localhost:9191/addUser`,
      data: {
        "fullname": fullname,
        "dob": dob,
        "gender": gender,
        "phone": phone,
        "address": address,
        "username": username,
        "password": password,
        "isAdmin": 0,
        "note": ""
      },
    })
      .then((res) => {
          alert("Dang ki thanh cong")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bodySection">
      {/* body */}
      <div className="backgroundCover">
        <div className="content">
          <div className="content-header">
            <AiOutlineShoppingCart
              className="headerIcon"
              color="#fff"
              fontSize={50}
            />
            <h1 className="welcomeText">Sign up</h1>
          </div>

          <div className="formContent">
            <div className="inputForm">
              <input className="input" type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)}></input>

              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <input
                className="input"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>

              <input
                className="input"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullname(e.target.value)}
              ></input>

              <input
                className="input"
                type="text"
                placeholder="Date"
                onChange={(e) => setDob(e.target.value)}
              ></input>

              <input
                className="input"
                type="text"
                placeholder="Gender"
                onChange={(e) => setGender(e.target.value)}
              ></input>

              <input
                className="input"
                type="text"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              ></input>

              <input
                className="input"
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>

              <button
                className="btSignin"
                onClick={() => (CheckSignup()?navigate("/signin"):null)}
              >
                Sign Up
              </button>

              <p className="SignupText">
                <span>Already have an account?</span>
                <a href="" className="link" onClick={() => navigate("/signin")}>
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
