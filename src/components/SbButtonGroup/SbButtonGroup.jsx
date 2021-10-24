import React, { useState } from "react";
import { Box, Divider } from "@material-ui/core";
import SbHighlightButton from "../SbHighlightButton/SbHighlightButton";

export default function SbButtonGroup(props) {
  const handleChange = (event, param) => {
    setActiveIdx(param);
    props.onChange(param);
  };

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <Box display="flex" justifyContent="space-around">
      {props.buttons.map((button, index) => (
        <div key={index}>
          {index !== 0 && (
            <Divider
              flexItem
              orientation="vertical"
              style={{ marginTop: 10, marginBottom: 10 }}
            ></Divider>
          )}
          <SbHighlightButton
            index={index}
            title={button.title}
            onClick={handleChange}
            active={activeIdx === index}
          ></SbHighlightButton>
        </div>
      ))}
    </Box>
  );
}

SbButtonGroup.defaultProps = {
  onChange: null,
};
