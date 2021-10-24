import React from "react";
import * as GA from "../tracker";
import { makeStyles, withStyles, Tabs, Tab } from "@material-ui/core";
import PropType from "prop-types";
import { NavLink, useHistory } from "react-router-dom";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 6
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    fontFamily: "Nunito-Bold",
    fontSize: 26,
    width: 'fit-content',
    [theme.breakpoints.down('sm')]:{fontSize: 18},
    textTransform: "none",
    marginRight: theme.spacing(1),
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
}));

export default function SbTabs(props) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const basename = history.createHref({pathname: '/'}).slice(0, -1);
    const url = `/tag/${props.tabs[newValue].url}`;
    GA.pageview(basename + url);
    history.push(url);
  };

  return (
    <div className={classes.root}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
      >
        {props.tabs.map((tab, i) => (
          <StyledTab key={tab.id} label={tab.name} component={NavLink} to={`/tag/${tab.url}`} style={{ color: 'black', textDecoration: 'none', display: "flex" }} />
        ))}
      </StyledTabs>
    </div>
  );
}

SbTabs.propTypes = {
  tabs: PropType.array,
};
