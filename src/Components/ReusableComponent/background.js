import react from "react";
import "./styles.css";

export const Background = (props) => {
  return (
    <div className="body">
      <div className="banner-text">{props.children}</div>
      <div className="animation-area">
        <ul className="box-Area">
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className="box-Area2">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
