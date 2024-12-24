import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/categoryForm.js";
import LocalSearch from "../../../components/forms/searchForm.js";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
 

  //1st step
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success(`Category created successfully ${res.data.name} `, { position: "top-right" });
        loadcategories();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        cogoToast.warn(`${err} `, { position: "top-right" });
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.user.token)
        .then((res) => {
          setLoading(false);
          cogoToast.warn(`${res.data.name} deleted`, { position: "top-right" });
          loadcategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            cogoToast.warn(`${err} `, { position: "top-right" });
          }
        });
    }
  };

  //step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-2">
          <AdminDashboard />
        </div>
        <div className="col-md-10 p-4">
          {loading ? (
            <h1 className="text-danger">Loading.......</h1>
          ) : (
            <h1 style={{textAlign: "center", marginTop: "20px" , textTransform : "uppercase"}} >Create product category</h1>
            
          )}

<hr />

          <CategoryForm
            handlesubmit={handlesubmit}
            name={name}
            setName={setName}
            Button={Button}
            LockOutlined={LockOutlined}
          />

          {/* step 2 */}

     

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {categories.filter(searched(keyword)).map((c) => (
            <div
              className="alert alert-secondary d-flex justify-content-between align-items-center"
              key={c._id}
            >
              <div>{c.name}</div>
              <div>
                <span
                  onClick={() => handleRemove(c.slug)}
                  className="btn btn-sm"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  
};

export default CreateCategory;
