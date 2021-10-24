import React from "react";
import { Container } from "@material-ui/core";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar/PrimarySearchAppBar";
import { Footer } from "../components/Footer/Footer";
import "../styles/main.scss";

export default function DefaultLayout(props) {
  return (
    <div className="default-layout">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <Container maxWidth="lg">{props.children}</Container>
      <Footer />
    </div>
  );
}
