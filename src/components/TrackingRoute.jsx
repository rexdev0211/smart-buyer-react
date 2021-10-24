import React from "react";
import * as GA from "../tracker";
import { Route } from "react-router-dom";

export default function TrackingRoute(props) {
  const {children, component, render, ...other} = props;

  return <Route {...other} render={({history, location}) => {
    const {pathname, search, hash} = location;
    const basename = history.createHref({pathname: '/'}).slice(0, -1);
    const path = basename + pathname + search + hash;
    GA.pageview(path);
    return <Route {...props} />;
  }} />;
}