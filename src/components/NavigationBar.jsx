import * as React from "react";
import { Component } from "react";
import { Breadcrumbs, Link, Typography, makeStyles } from "@material-ui/core";
import arrowSVG from "../assets/svg/arrow-yellow.svg";

const useStyles = makeStyles((theme) => ({
  navField: {
    backgroundImage: `url(${arrowSVG})`,
  },
}));

export default function NavigationBar() {
  const classes = useStyles();

  return (
    <Breadcrumbs separator=" " aria-label="breadcrumb">
      <Link
        color="inherit"
        href="/"
        // onClick={this.handleClick}
      >
        <Typography className={classes.navField} variant="h6">
          Home
        </Typography>
      </Link>
      <Link
        color="inherit"
        href="/"
        // onClick={this.handleClick}
      >
        <Typography className={classes.navField} variant="h6">
          Technology
        </Typography>
      </Link>
      <Typography className={classes.navField} variant="h6" color="textPrimary">
        Breadcrumb
      </Typography>
    </Breadcrumbs>
  );
}
