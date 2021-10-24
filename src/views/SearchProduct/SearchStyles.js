import {
  makeStyles,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

const SearchStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    textAlign: "left",
  },
  container: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 30,
    },
    flexBasis: "100%",
  },
  result: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  loadBtn: {
    display: "inline-block",
    margin: 20,
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: yellow[700],
    },
    color: theme.palette.grey[900],
    fontFamily: "Nunito-SemiBold",
    fontSize: 22,
    width: 300,
    textTransform: "none",
    textDecoration: "none",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4
  },
  btnDisabled: {
    display: "inline-block",
    margin: 20,
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.grey[900],
    fontFamily: "Nunito-SemiBold",
    fontSize: 22,
    width: 300,
    textTransform: "none",
    textDecoration: "none",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4
  },
  hidesm: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hidemd: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  action: {
    backgroundColor: "#FFE403",
    width: 70,
    height: 70,
    position: "fixed",
    zIndex: 999,
    right: 25,
    bottom: 40,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default SearchStyles;
