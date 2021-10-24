import React from "react";
import PropType from "prop-types";
import "./SbBreadCrumbs.scss";
import { Link } from 'react-router-dom';

export default function SbBreadCrumbs(props) {
  return (
    <ul className="breadcrumb">
      {props.crumbs?.map((crumb, i) => (
        <li key={i}>
          <Link to={crumb.link}>{crumb.title}</Link>
        </li>
      ))}
    </ul>
  );
}

SbBreadCrumbs.propTypes = {
  crumbs: PropType.array,
};
