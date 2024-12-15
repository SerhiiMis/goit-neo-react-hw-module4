import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines strokeColor="#3f51b5" strokeWidth="5" />
    </div>
  );
};

export default Loader;
