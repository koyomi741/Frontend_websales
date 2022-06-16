import React, { useState } from "react";
import { data } from "../../../data/user";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect } from "react";
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
  const [users, setUsers] = useState<user[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAppContext();

  useEffect(() => {
    getAPI();
  }, []);
  const getAPI = () => {
    axios({
      method: "get",
      url: "http://localhost:9191/users",
      data: null,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = () => {
    
    if(username == "" || password == ""){
      alert("Khong duoc de trang")
    } else {
      let check = false;
      users.forEach((u) => {
        if (username === u.username && password === u.password) {
          setUser(u);
          console.log(u);
          check = true;
        }
      })
      if(check){
        return true;
      } 
      alert("Sai thong tin dang nhap")
      return false;
    }
  };

  console.log(users);
  return (
    <div className="bodySection">
      {/* <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => (login() === "Admin" ? navigate("/") : null)}>
        Login
      </button> */}

      {/* body */}
      <div className="backgroundCover">
        <div className="content">
        <div className="content-header">
            <AiOutlineShoppingCart
              className="headerIcon"
              color="#fff"
              fontSize={50}
            />
            <h1 className="welcomeText">Sign in</h1>
          </div>

          <div className="formContent">
            <div className="inputForm">
              <input
                className="input-signin"
                type="text"
                placeholder="Email"
                onChange={(e) => setUsername(e.target.value)}
              ></input>

              <input
                className="input-signin"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <button
                className="btSignin"
                onClick={() => (login() ? navigate("/") : null)}
              >
                Sign In
              </button>

              <p className="forgetText">Forgot password?</p>
              <p className="SignupText">
                <span>Don't have an account?</span>
                <a href="" className="link" onClick={() => navigate("/signup")}>
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
