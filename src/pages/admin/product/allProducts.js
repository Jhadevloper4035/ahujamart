import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import {
  getProductByCount,
  removeProduct,
} from "../../../functions/product.js";

import AdminProductCard from "../../../components/cards/adminProductCard.js";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (answer) {
      removeProduct(slug, user.user.token)
        .then((res) => {
          loadAllProducts();
          cogoToast.success(`Product removed successfully `, { position: "top-right" });
        })
        .catch((err) => {
          console.error("Error removing product:", err);
          cogoToast.success(`Failed to remove product. Please try again.`, { position: "top-right" });

        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>
        <div className="col-md-10">
          {loading ? <h2>Loading........</h2> : 
          <h1 style={{textAlign: "center", marginTop: "20px" , textTransform : "uppercase"}} >All Products</h1>}
          <div className="row  ">
          <hr />
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
