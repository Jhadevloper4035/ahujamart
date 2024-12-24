import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { getSingleProduct } from "../../../functions/product.js";
import { useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/productUpdateForm.js";
import { getCategories, getCategorySubs } from "../../../functions/category.js";
import FileUpload from "../../../components/forms/fileUpload.js";

const initialState = {
  sku: "",
  name: "",
  slug: "",
  price: "",
  discount: 0,
  new: false,
  sellsCount: 0,
  category: "",
  subs: [],
  tag: [],
  stock: "",
  shortDescription: "",
  description: "",
  images: [],
  shipping: "",
  ratings: [],
  categories: [],
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { slug } = useParams();


  useEffect(() => {
    // Load product and categories on component mount
    loadProduct();
    loadCategories();
  }, []);

  const handleSubmit = (req, res) => {};

  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  
  const loadProduct = async () => {
    try {
      const { data: product } = await getSingleProduct(slug);
      const { subs, ...rest } = product;
  
      // Update product state
      setValues({ ...values, ...rest });
  
      // Load subcategories for the current product category
      const { data: subsData } = await getCategorySubs(product.category._id);
      setSubOptions(subsData);
  
      // Set default selected subcategories
      const subIds = subs.map((sub) => sub._id);
      setArrayOfSubs(subIds);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };
  
  const loadCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  
  const handleCategoryChange = async (e) => {
    e.preventDefault();
    const selectedCatId = e.target.value;
    setSelectedCategory(selectedCatId);
    setValues({ ...values, subs: [] }); // Reset subcategories
    setArrayOfSubs([]); // Clear selected subcategory IDs
  
    try {
      const { data: subsData } = await getCategorySubs(selectedCatId);
      setSubOptions(subsData);
      // If the selected category matches the product's current category, reload product details
      if (values.category._id === selectedCatId) {
        loadProduct();
      }
    } catch (error) {
      console.error("Error loading subcategories:", error);
    }
  };
  
 
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>

        <div className="col-md-10">
          <h4 className="text-center text-uppercase">Product update </h4>

          <div className="p-3">
            <FileUpload values={values} setValues={setValues} />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
