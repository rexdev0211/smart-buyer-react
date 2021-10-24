import {
  makeStyles,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

const FilterPanelStyles = makeStyles(() => ({
  panel: {
    width: 260,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.135216)",
    borderRadius: 5,
    textAlign: "center",
  },
  contentTitle: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
  },
  category: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    color:"black", 
    textDecoration:"none"
  },
  categoryLabel: {
    fontFamily: "Nunito-ExtraLight",
    fontSize: 16,
  },
  filterBtn: {
    marginTop: 20,
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: yellow[700],
    },
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    width: "100%",
    textTransform: "none",
  },
}));

export default FilterPanelStyles;
