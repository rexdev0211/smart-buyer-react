import * as React from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup, Typography, Box } from "@material-ui/core";
import "./SbRadioButtonGroup.scss";

export default function SbRadioButtonGroup(props) {
  return (
    <Box mt={2} mb={3}>
      <Typography align={"left"} className="group-title">
        {props.title}
      </Typography>
      <RadioGroup row>
        {props.values?.map((color, i) => (
          <Radio
            key={i}
            style={{ color: color }}
            color="secondary"
            value={color}
          ></Radio>
        ))}
      </RadioGroup>
    </Box>
  );
}

SbRadioButtonGroup.propTypes = {
  title: PropTypes.string,
  values: PropTypes.array,
};
