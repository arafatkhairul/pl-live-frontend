import React from "react";

//redux
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ path, component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("isAuth");

  return isAuth ? (
    <Route path={path} component={Component} {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
