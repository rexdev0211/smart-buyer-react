import React from "react";
import { Typography } from "@material-ui/core";
import "./SbHighlightButton.scss";

export default function SbHighlightButton(props) {
  const onClick = (e) => {
    if (props.onChange !== null) {
      props.onClick(e, props.index);
    }
  };

  return (
    <div style={{ margin: 5 }} onClick={onClick}>
      <Typography
        component="h2"
        className={props.active ? "active" : "deactive"}
      >
        {props.title}
      </Typography>
      {props.active && (
        <span className="highlight-wrap">
          <span className="highlight"></span>
        </span>
      )}
    </div>
  );
}

SbHighlightButton.defaultProps = {
  index: 0,
  title: "",
  onClick: null,
  active: false,
};
