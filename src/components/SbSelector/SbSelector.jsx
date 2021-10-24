import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import "./SbSelector.scss";

export default function SbSelector(props) {
  return (
    <Box mt={2} mb={3}>
      <Typography align={"left"} className="selector-title">
        {props.title}
      </Typography>
      <FormControl variant="outlined" fullWidth>
        {/* <InputLabel id="demo-simple-select-outlined-label"></InputLabel> */}
        <Select
        //   labelId="demo-simple-select-outlined-label"
        //   id="demo-simple-select-outlined"
        //   value=""
        //   onChange={handleChange}
        //   label=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.values?.map((value) => (
            <MenuItem value={props.value}>{props.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

SbSelector.propTypes = {
  title: PropTypes.string,
  values: PropTypes.array,
};
