import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCount((currCount) => --currCount);
    }, 1000);

    if (count === 0)  setRedirect(true);

    return () => clearInterval(interval);
  }, [count]);

  return redirect ? (
    <Navigate to="/login" />
  ) : (
    <div className="container p-5 text-center">
      <p>Redirecting you to login page in {count}s</p>
    </div>
  );
};

export default LoadingToRedirect;
