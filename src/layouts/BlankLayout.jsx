import React from "react";
import "../styles/main.scss";

export default function BlankLayout({ className, children }) {
  return <div className={`blank-layout ${className}`}>{children}</div>;
}
