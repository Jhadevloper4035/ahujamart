import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product.js";
import { getCategories, getCategorySubs } from "../../../functions/category.js";
import ProductCreateForm from "../../../components/forms/productCreateForm.js";
import FileUpload from "../../../components/forms/fileUpload.js";

const initialState = {
  sku: "",
  name: "",
  slug: "",
  price: "",
  discount: 0,
  new: false,
  saleCount: 0,
  category: "",
  subs: [],
  tag: [],
  stock: "",
  shortDescription: "",
  fullDescription: "",
  image: [],
  shipping: "",
  rating: 0,
  categories: [],
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.user.token)
      .then((res) => {
        window.alert(`"${res.data.name}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.err) {
          cogoToast.warn(`${err} `, { position: "top-right" });
        } else {
          cogoToast.warn("Product creation failed. Try again.", {
            position: "top-right",
          });
        }
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>

        <div className="col-md-10">
          <h1
            style={{
              textAlign: "center",
              marginTop: "20px",
              textTransform: "uppercase",
            }}
          >
            Create Product{" "}
          </h1>
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
