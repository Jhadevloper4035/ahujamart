import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import cogoToast from 'cogo-toast';

const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  // const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  
  const [selectedProductSize, setSelectedProductSize] = useState(product?.variants?.size?.[0]?.name);
  const [finalProductPrice, setFinalProductPrice] = useState(
    product.variants?.size?.[0]?.price ?
      product.variants?.size?.[0]?.price : 
      +(product.price * currency.currencyRate).toFixed(2));
  const [quantity, setQuantity] = useState(1); 

  // Handle size selection change
  const handleSizeChange = (e) => {
    // const currentSize = e.target.value.split('-')[0];
    const currentPrice = e.target.value.split('-')[1];
    setSelectedProductSize(e.target.value);
    if(currentPrice != "undefined"){
      setFinalProductPrice(currentPrice);
    }
  };

  // Handle Add to Cart action
  const handleAddToCart = () => {
    // Dispatch add to cart action with selected size
    if(product?.variants?.size?.length > 0){
      if (!selectedProductSize) {
        // If no size is selected, show a toast or alert (optional)
        cogoToast.error("Please select a size", { position: "bottom-left" });
        return;
      }
      dispatch(addToCart({
        ...product,
        selectedProductSize,  // Add selected size to the product object
        quantity,  // Use the selected quantity
      }));
    }else{
      dispatch(addToCart(product));
    }
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            <img
              className="default-img"
              src={process.env.PUBLIC_URL + product.image[0]}
              alt=""
            />
            {product.image.length > 1 ? (
              <img
                className="hover-img"
                src={process.env.PUBLIC_URL + product.image[1]}
                alt=""
              />
            ) : (
              ""
            )}
          </Link>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                  Select Option
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  // onClick={() => 
                  //   dispatch(addToCart(product))
                  // }
                  onClick={handleAddToCart}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setModalShow(true)}>
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="size-select-box">
          {product?.variants?.size?.length > 0 &&(
            <select className="pro-details-size"  
                value={selectedProductSize}
                onChange={handleSizeChange}
              >
                {/* <option>Select Size</option> */}
                {product?.variants?.size.map(item => {
                  return(
                    <option 
                      value={`${item.name}-${item.price}`}
                    > 
                      <span>{item.name}</span>
                      {item.price && <span>{"  "} ({currency.currencySymbol}{item.price})</span>}
                    </option>
                  );
                })}
            </select>
          )}
        </div>

        <div className="product-content text-center">
          <h3 style={{textTransform : "capitalize"}}>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.name}   ({product.measure} )
            </Link>
          </h3>
          
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol} {finalProductPrice}</span>
                <span className="old"> {currency.currencySymbol} {finalProductPrice}</span>
              </Fragment>
            ) : (
              <span> {currency.currencySymbol} {finalProductPrice} </span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
