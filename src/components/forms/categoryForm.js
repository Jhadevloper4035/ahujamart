
import React from "react";


const CategoryForm = ({handlesubmit ,name ,setName ,Button , LockOutlined}) => (

 
  
    <form onSubmit={handlesubmit}>
      <div data-mdb-input-init="" className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          {" "}
          Category Name{" "}
        </label>
        <input
          type="text"
          className="form-control"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <Button
        type="primary"
        className="mb-4"
        shape="round"
        block
        icon={<LockOutlined />}
        size="large"
        onClick={handlesubmit}
        disabled={name.length < 1}
      >
        Create
      </Button>

      <div className="text-center"></div>
    </form>
  );


  export default CategoryForm;