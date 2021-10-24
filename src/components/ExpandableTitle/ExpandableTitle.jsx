import React from "react";
import PropType from "prop-types";
import { Box, Typography, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ExpandableTitle.scss";

export default function ExpandableTitle(props) {
  const [t] = useTranslation();
  
  return (
    <Box className="expandable-title">
      <Typography className="home-title">{props.title}</Typography>
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Link to={props.link} className="link">
        {t("See All")} {">"}
      </Link>
    </Box>
  );
}

ExpandableTitle.propTypes = {
  title: PropType.string,
  link: PropType.string,
};
