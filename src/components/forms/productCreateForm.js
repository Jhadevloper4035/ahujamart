import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    sku,
    name,
    slug,
    price,
    discount ,
    rating,
    saleCount,
    category,
    subs,
    tag ,
    isNew,
    stock,
    shortDescription,
    fullDescription,
    image: [],
    shipping,
    categories,
  } = values;

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-6 mt-2">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            className="form-control"
            value={sku}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6 mt-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6 mt-2">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6 mt-2">
          <label>Discount (%)</label>
          <input
            type="number"
            name="discount"
            className="form-control"
            value={discount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6 mt-2">
          <label>Is New</label>
          <select
            name="new"
            className="form-control"
            value={isNew}
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>


        <div className="form-group col-md-6 mt-2">
          <label>Sells Count</label>
          <input
            type="number"
            name="saleCount"
            className="form-control"
            value={saleCount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6 mt-2">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            value={shipping}
            onChange={handleChange}
          >
            <option>Please select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 mt-2">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={stock}
            onChange={handleChange}
          />
        </div>


        <div className="form-group col-md-6 mt-2">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>  {c.name} </option>
              ))}
          </select>
        </div>



        

        {showSub && (
          <div className="form-group col-md-6 mt-2">
            <label>Sub Category</label>
             <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}> {s.name} </Option>
                ))}
            </Select> 
          </div>
        )}


        <div className="form-group col-md-6 mt-2">
          <label style={{textTransform : "capitalize" , marginBottom : "15px;"}}>Short Description</label>
          <input
            type="text"
            name="shortDescription"
            className="form-control"
            value={shortDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-12">
          <label>Full Description</label>
          <textarea
            name="fullDescription"
            className="form-control"
            value={fullDescription}
            onChange={handleChange}
            rows="4"
          />
        </div>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;
