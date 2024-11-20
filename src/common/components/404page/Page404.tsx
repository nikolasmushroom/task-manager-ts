import classes from "./Page404.module.css";
import image404 from "./../../../asserts/page-404.svg";
import { NavLink } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className={classes.page}>
      <img src={image404} alt="404 image" />
      <div className={classes.message}>
        <p>This page wasn't founded</p>
      </div>
      <div>
        <NavLink to={'/'} className={classes.buttonLink}>
          Return to main page
        </NavLink>
      </div>
    </div>
  );
};