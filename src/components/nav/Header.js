import React, { useState } from "react";
import { HomeOutlined, UserOutlined, UserAddOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import {  Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleclick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const dispatch = useDispatch();
  let naviagte = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));


  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      
      toast.success("User signed out successfully");
      naviagte("/");

    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Error signing out ");
    }
  };

  return (
    <Menu onClick={handleclick} selectedKeys={[current]} mode="horizontal">

      <Item key="/home" icon={<HomeOutlined />}>  <Link to="/"> Home </Link> </Item>

      {user && (
  <SubMenu
    key="/account"
    title={user?.email ? user.email.split('@')[0] : 'userName'}
    icon={<SettingOutlined />}
  >
    {user && user.role === "subscriber" && (
      <Item key="/user/page">
        <Link to="/user/page">Dashboard</Link>
      </Item>
    )}

    {user && user.role === "admin" && (
      <Item key="/admin/dashboard">
        <Link to="/admin/dashboard">Dashboard</Link>
      </Item>
    )}

    <Item key="/account3" icon={<UserOutlined />} onClick={logout}>
      Logout
    </Item>
  </SubMenu>
)}


     

      {!user && (
        <> 
        <Item key="/login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
        <Item  key="/register"  icon={<UserAddOutlined />} className="float-right" >
          <Link to="/register"> Register </Link>
        </Item>
        </>
      )}

    
    </Menu>
  );
};

export default Header;
