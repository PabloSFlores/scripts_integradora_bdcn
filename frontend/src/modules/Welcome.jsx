import React from "react";
import styles from "../shared/styles.css";
import  lego  from "../assets/lego.jpeg";
import { Figure, Row } from "react-bootstrap";

const welcome = () => {
  return (
    <div className="center">
        <h1 >BIENVENIDO</h1>
      <Figure className="mx-5 shadow-box">
        <Figure.Image width={700} src={lego} />
      </Figure>
    </div>
  );
};

export default welcome;
