import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};



export const getProductByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};


export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};


export const getSingleProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};




export const getProducts = async (sort , order , page) => {
  return await axios.post(`${process.env.REACT_APP_API}/products` , {
    sort,
    order,
    page
  });
};



export const getproductCounts = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/product/total`  );
};

