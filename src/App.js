import { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import firebase from "./firebase.js";
import { getAuth } from "firebase/auth";
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/user-slice";
import AdminRoute from "./routes/adminRoute.js";

// Lazy load components
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopFruits = lazy(() => import("./pages/shop/fruits.js"));
const ShopVegetable = lazy(() => import("./pages/shop/vegetable.js"));
const ShopDairy = lazy(() => import("./pages/shop/dairy.js"));

const Product = lazy(() => import("./pages/shop-product/Product"));
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const Login = lazy(() => import("./pages/other/Login"));
const Register = lazy(() => import("./pages/other/Register"));
const RegisterComplete = lazy(() =>
  import("./pages/other/RegisterComplete.js")
);
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword.js"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

//admin dashboard

const AdminDashboard = lazy(() => import("./pages/admin/adminDashboard.js"));
const CreateCategory = lazy(() =>
  import("./pages/admin/category/createCategory.js")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/categroyUpdate.js")
);
const SubCreate = lazy(() => import("./pages/admin/sub/subcreate.js"));
const UpdateSubcat = lazy(() => import("./pages/admin/sub/subUpdate.js"));
const ProductCreate = lazy(() =>
  import("./pages/admin/product/productCreate.js")
);
const AllProducts = lazy(() => import("./pages/admin/product/allProducts.js"));
const ProductUpdate = lazy(() =>
  import("./pages/admin/product/productUpdate.js")
);

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              setUser({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomeFashionThree />} />
            <Route
              path="/exclusive-collection"
              element={<ShopGridStandard />}
            />
            <Route path="/exclusive-fruits" element={<ShopFruits />} />
            <Route path="/exclusive-vegetable" element={<ShopVegetable />} />
            <Route path="/exclusive-dairy" element={<ShopDairy />} />

            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/complete" element={<RegisterComplete />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/category" element={<CreateCategory />} />
              <Route
                path="/admin/category/:slug"
                element={<CategoryUpdate />}
              />
              <Route path="/admin/sub/" element={<SubCreate />} />
              <Route path="/admin/sub/:slug" element={<UpdateSubcat />} />
              <Route path="/admin/product" element={<ProductCreate />} />
              <Route path="/admin/products" element={<AllProducts />} />
              <Route path="/admin/product/:slug" element={<ProductUpdate />} />
            </Route>
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
