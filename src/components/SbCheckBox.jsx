import React from "react";
import clsx from "clsx";
import { FormControlLabel, makeStyles, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import PropType from "prop-types";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#ffe403",
    boxShadow: "none",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#ffb100",
    },
  },
  formLabel: {
    fontFamily: "Nunito-ExtraLight",
    fontSize: 16,
  },
});

export default function SbCheckBox(props) {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={props.onChange}
          className={classes.root}
          disableRipple
          //   color="default"
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          inputProps={{ "aria-label": "decorative checkbox" }}
          {...props}
        />
      }
      label={
        <Typography className={classes.formLabel}>{props.title}</Typography>
      }
    />
  );
}

SbCheckBox.propTypes = {
  title: PropType.string,
  onChange: PropType.func,
};
