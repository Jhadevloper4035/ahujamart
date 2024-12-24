import React, { useEffect, useState } from "react";
import {   getProducts , getproductCounts} from "../../functions/product.js";
import ProductCard from "../cards/ProductCard.js";
import LoadingCard from "../cards/LoadingCard.js";
import { Pagination } from "antd";



const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page , setPage ] = useState(1);
  const [productcounts , setProductCounts] = useState();

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
   
    getproductCounts().then((res) => {
      setProductCounts(res.data)
    })


  }, []);



  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold" , "desc" , page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
    

      <h4 className="text-center mt-5 mb-5 jumbotron p-3 display-4 ">New Arrivals    </h4>

      <div className="container mt-4">
       
        {loading ? ( <LoadingCard  count={6} /> ) :   (
          <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        )
         
    
        }







        <div className="row d-flex justify-content-center">

<nav className="col-md-4  mt-5 mb-5 d-flex justify-content-center">

<Pagination 
current={page} 
total={Math.ceil((productcounts / 3) * 10) } 
onChange={(value) => setPage(value)} 
/>

</nav>
</div>

       
      </div>


    


    </>
  );
};

export default BestSeller;
