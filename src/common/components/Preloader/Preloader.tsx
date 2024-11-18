import preloaderTube from "./../../../asserts/animations/mainAppPreloader.svg";
import styles from "./Preloader.module.css";

export const Preloader = () => {
  return <div>
    <div className={styles.preloaderContainer}>
      <img style={{ width: "500px", height: "500px" }} src={preloaderTube} alt="preloader spiner" />
    </div>
    ;
  </div>;
};