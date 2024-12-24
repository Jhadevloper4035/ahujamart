import React from "react";
import { Link } from "react-router-dom";

const adminNavbar = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item ">
        <Link to="/admin/dashboard" className="nav-link ">
          Dashboard
        </Link>
      </li>

      <li className="nav-item" style={{textTransform : "uppercase" }}>
        <Link to="/admin/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item" style={{textTransform : "uppercase" }} >
        <Link to="/admin/products" className="nav-link">
          Allproducts
        </Link>
      </li>


      <li className="nav-item" style={{textTransform : "uppercase" }} >
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item" style={{textTransform : "uppercase" }} >
        <Link to="/admin/sub" className="nav-link">
          Subs
        </Link>
      </li>


    


      <li className="nav-item" style={{textTransform : "uppercase" }}>
        <Link to="/user/passwords" className="nav-link">
          users
        </Link>
      </li>

      
      <li className="nav-item" style={{textTransform : "uppercase" }}>
        <Link to="/user/passwords" className="nav-link">
          Orders
        </Link>
      </li>


      <li className="nav-item" style={{textTransform : "uppercase" }}>
        <Link to="/user/passwords" className="nav-link">
          Passwords
        </Link>
      </li>

      <li className="nav-item" style={{textTransform : "uppercase" }} >
        <Link to="/admin/coupan" className="nav-link">
          Coupons
        </Link>
      </li>


    </ul>
  </nav>
);

export default adminNavbar;
