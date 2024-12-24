import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import { getSingleCategory,  updateCategory,} from "../../../functions/category.js";
import { useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";
import {  useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/categoryForm.js";

const UpdateCategory = ({match}) => {

    const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams(); 
  const navigate = useNavigate();


  useEffect(() => {
    loadCategories();
  }, []);


  const loadCategories = () => {
    getSingleCategory(slug).then((c) => {
      setName(c.data.name); // Assuming setName updates the state with the category name
    });
  };
  
  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory( slug , { name }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success("Category Update successfully", { position: "bottom-left" });
        navigate("/admin/category")

      })
      .catch((err) => {
        setLoading(false);
        cogoToast.warn(`${err} `, { position: "bottom-left" });
      });
  };


  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>
        <div className="col-md-8">
          {loading ? (
            <h1 className="text-danger">Loading.......</h1>
          ) : (
            <h1>Create product category</h1>
          )}

         <CategoryForm  handlesubmit={handlesubmit} name={name} setName={setName} Button={Button}  LockOutlined={LockOutlined}  />
          <hr />
        
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
