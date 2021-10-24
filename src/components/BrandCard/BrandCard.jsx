import React from "react";
import PropType from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./BrandCard.scss";

export default function BrandCard(props) {
  return (
    <Box className="brand-card">
      <Link
        to={`/brand/${props.url}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box className="brand-logo">
          <img src={props.logoUrl} width="90%" alt="Logo"></img>
        </Box>
        <Typography className="brand-title">{props.nicename}</Typography>
      </Link>
    </Box>
  );
}

BrandCard.propTypes = {
  name: PropType.string,
  nicename: PropType.string,
  logoUrl: PropType.string,
  url: PropType.string,
};
