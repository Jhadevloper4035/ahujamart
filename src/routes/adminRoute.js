import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/auth/loadingRedirect";
import { currentAdmin } from "../functions/auth";

const AdminRoute = () => {
  const user = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user.user && user.user.token) {
      currentAdmin(user.user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log("CURRENT USER ADMIN ROUTE", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
