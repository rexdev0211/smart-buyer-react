import React from "react";
import { Button, Input, makeStyles, Typography } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import BlankLayout from "../../../layouts/BlankLayout";
import logo from "../../../assets/svg/sb-logo.svg";
import iGoogle from "../../../assets/svg/iGoogle.svg";
import iLinkedin from "../../../assets/svg/iLinkedin.svg";
import iTwitter from "../../../assets/svg/iTwitter.svg";
import iFacebook from "../../../assets/svg/iFacebook.svg";
import "./SignUp.scss";

const useStyles = makeStyles(() => ({
  submit: {
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: yellow[700],
    },
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    width: "100%",
    height: 50,
    textTransform: "none",
    marginTop: 2,
  },

  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 26,
  },

  form: {
    marginTop: 20,
  },

  input: {
    height: 50,
    border: "1px solid #c6cfe1",
    borderBottom: "none",
    marginBottom: -1,
    paddingLeft: 20,

    fontFamily: "Nunito-Regular",
    fontSize: 19,
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <BlankLayout className="layout-background">
      <div className="logo-section">
        <Link to="/">
          <img className="main-logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="container">
        <div className="signup-container">
          <Typography variant="h2" className={classes.title}>
            Sign Up
          </Typography>

          <form className={classes.form} autoComplete="off">
            {/* <TextField id="standard-basic" label="Name" /> */}
            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
            <Input
              className={classes.input}
              placeholder="Name"
              fullWidth
              required
            />
            <Input
              className={classes.input}
              placeholder="Email"
              type="email"
              fullWidth
              required
            />
            <Input
              className={classes.input}
              placeholder="Password"
              type="password"
              fullWidth
              required
            />
            <Button className={classes.submit}>Sign Up</Button>
          </form>

          <Link to="/" style={{ textAlign: "right", marginTop: 15 }}>
            <Typography>Forgot Password?</Typography>
          </Link>

          <Typography
            component="span"
            style={{
              marginTop: 45,
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            Don't have an account?
            <Link to="/" style={{ marginLeft: 3 }}>
              <Typography> Sign In</Typography>
            </Link>
          </Typography>
        </div>

        <div className="signwith-container">
          <Typography variant="h2" className={classes.title}>
            Sign With
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              marginTop: 50,
            }}
          >
            <Button
              variant="contained"
              // size="large"
              className={"logo-button"}
              style={{ backgroundColor: "#d62d20" }}
              startIcon={<img src={iGoogle} width="25px" alt="Google"></img>}
            >
              Google
            </Button>
            <Button
              variant="contained"
              className={"logo-button"}
              style={{ backgroundColor: "#3B5998" }}
              startIcon={
                <img src={iFacebook} width="25px" alt="Facebook"></img>
              }
            >
              Facebook
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#1DCAFF" }}
              className={"logo-button"}
              startIcon={<img src={iTwitter} width="25px" alt="Twitter"></img>}
            >
              twitter
            </Button>
            <Button
              variant="contained"
              className={"logo-button"}
              style={{ backgroundColor: "#0077B5" }}
              startIcon={
                <img src={iLinkedin} width="25px" alt="LinkedIn"></img>
              }
            >
              Linkedin
            </Button>
          </div>
        </div>
      </div>
    </BlankLayout>
  );
}
