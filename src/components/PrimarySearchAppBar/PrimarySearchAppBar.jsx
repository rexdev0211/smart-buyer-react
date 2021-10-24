import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  Badge,
  IconButton,
  createMuiTheme,
  ThemeProvider,
  Container,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link, withRouter } from "react-router-dom";
import { yellow } from "@material-ui/core/colors";
import { useTranslation } from "react-i18next";
import logo from "../../assets/svg/sb-logo.svg";
import userDefaultAvatar from "../../assets/images/user-default-avatar.png";
import iLogOut from "../../assets/svg/log-out.svg";
import "./PrimarySearchAppBar.scss";
import { useQuery } from "micro-graphql-react";
import { Search } from "../Search/Search";
import FETCH_LANGUAGES from "../../data/queries/fetchLanguages";
import { ViewportProviderContext } from "../../contexts/ViewportProvider";
import { SearchBarContext } from "../../contexts/SearchBarContext";
import { UserService } from "../../services/UserService";

import TuneIcon from "@material-ui/icons/Tune";

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        fontSize: 25,
      },
    },
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    right: "20px",
    marginRight: "0px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },  
    "& svg": {
      fontSize: "28px",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRigt: theme.spacing(2),
    marginLefth: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "flex",
  },
  iconButton: {
    padding: 10,
    borderRadius: "10%",
    background: yellow[300],
  },
  appBarBottom: {
    top: "auto",
    bottom: 0,
  },
  appBarTop: {
    top: 0,
    bottom: "auto",
  },
}));

const userInfo = {
  avatar: userDefaultAvatar,
  name: "Guest",
  email: "",
};

export default withRouter(function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [t] = useTranslation();
  const {searchActive, setSearchActive, setFilterActive, showFilter} = useContext(SearchBarContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { data, loading } = useQuery(FETCH_LANGUAGES);

  const { viewportSize } = useContext(ViewportProviderContext);

  const isMobile = viewportSize === 'mobile';

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignOut = () => {
   UserService.doSignOut();
  }

  const handleLogin = () => {
    UserService.doLogin();
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <div className="avatar">
          <img src={userInfo.avatar} alt="" style={{ width: 90, height: 90 }}></img>
          <p className="title">{userInfo.name}</p>
          <p className="subtitle">{userInfo.email}</p>
        </div>
      </MenuItem>
      {loading && (<MenuItem><p className="title">Loading...</p></MenuItem>)}
      {data?.languages.map((el, i) => (
        <MenuItem key={i} onClick={handleMenuClose}>
          <a className="link" href={`/${el.lang}`}>{el.label}</a>
        </MenuItem>
      ))}
      {!UserService.isLoggedIn() && (
        <MenuItem onClick={handleMenuClose}>
          <p
            className="title"
            style={{ display: "inline-flex", opacity: 0.3 }}
            onClick={handleLogin}
          >
            {t("Login")}
          </p>
        </MenuItem>
      )}
      {UserService.isLoggedIn() && (
        <MenuItem onClick={handleMenuClose}>
        <p
          className="title"
          style={{ display: "inline-flex", opacity: 0.3 }}
          onClick={handleSignOut}
        >
          {t("Sign Out")}
          <img
            src={iLogOut}
            alt=""
            width={25}
            height={25}
            style={{ marginLeft: 20 }}
          ></img>
        </p>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>{t("Messages")}</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t("Notifications")}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t("Profile")}</p>
      </MenuItem>
    </Menu>
  );

  const showFilterIcon = isMobile && showFilter;

  const SearchComponent = <Search
    active={searchActive}
    mobile={isMobile}
    onOpen={() => setSearchActive(true)}
    onClose={() => setSearchActive(false)}
  />;

  const ToolbarContent = searchActive && isMobile
    ? SearchComponent
    : <>
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>

      {SearchComponent}

      <div className={classes.sectionDesktop}>
      {showFilterIcon &&
        <IconButton
          edge="end"
          aria-label="filter"
          aria-haspopup="true"
          onClick={() => setFilterActive(true)}
          color="inherit"
        >
          <TuneIcon />
        </IconButton>
      }
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    </>

  return (
    <div className={classes.grow}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" className={!searchActive && isMobile ? classes.appBarBottom : classes.appBarTop}>
          <Container maxWidth="lg">
            <Toolbar className={classes.toolBar}>
              {ToolbarContent}
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </ThemeProvider>
    </div>
  );
})
