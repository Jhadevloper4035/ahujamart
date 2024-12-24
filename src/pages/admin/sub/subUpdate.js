import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { LockOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import { getSubSingle, updateSub } from "../../../functions/sub.js";
import { getCategories } from "../../../functions/category.js";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/categoryForm.js";
import { useNavigate, useParams } from "react-router-dom";


const UpdateSubcat = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [sub, setSub] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadcategories();
    loadSub();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const loadSub = () => {
    getSubSingle(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.name);
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug ,{ name, parent }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success(`Sub created successfully ${res.data.name} `, { position: "top-right" });
        navigate("/admin/sub")
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        cogoToast.warn(`${err} `, { position: "top-right" });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>
        <div className="col-md-8">
          { loading ? (
            <h1 className="text-danger">Loading.......</h1>
          ) : (
            <h1>Update Subcategory</h1>
          )}

          <div className="form-group">
            <label className="pt-2 pb-2 ">Salect Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
<option > Select Category  </option>


              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}  selected={c._id === parent}>
                  
                    {c.name}
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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UpdateSubcat;
