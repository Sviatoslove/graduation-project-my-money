import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="container rounded-3 shadow-lg p-5 w-50"
      style={{ marginTop: "100px", width: "35vw" }}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
