import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import { createSub, getSub, removeSub } from "../../../functions/sub.js";
import { getCategories } from "../../../functions/category.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/categoryForm.js";
import LocalSearch from "../../../components/forms/searchForm.js";

const CreateSub = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [subs, setSubs] = useState([]);

  //1st step
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadcategories();
    loadSubs();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const loadSubs = () => {
    getSub().then((s) => {
      setSubs(s.data);
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(parent);
    createSub({ name, parent }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success(`Sub created successfully ${res.data.name} `, {
          position: "top-right",
        });
        loadSubs();
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
      removeSub(slug, user.user.token)
        .then((res) => {
          setLoading(false);
          cogoToast.success(`Sub Deleted successfully ${res.data.name} `, {
            position: "top-right",
          });
          loadSubs();
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
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h1 className="text-danger">Loading.......</h1>
          ) : (
            <h1
              style={{
                textAlign: "center",
                marginTop: "20px",
                textTransform: "uppercase",
              }}
            >
              Create Subcategory
            </h1>
          )}

          <hr />

          <div className="form-group">
            <label className="pt-2 pb-2 ">Salect Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option> Select Category </option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {" "}
                    {c.name}{" "}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <CategoryForm
            handlesubmit={handlesubmit}
            name={name}
            setName={setName}
            Button={Button}
            LockOutlined={LockOutlined}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {subs.filter(searched(keyword)).map((s) => (
            <div
              className="alert alert-secondary d-flex justify-content-between align-items-center "
              key={s._id}
            >
              {s.name}

              <div>
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
                  <span className="btn btn-sm float-right">
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

export default CreateSub;
