import React from "react";
import styles from "./empty.module.css";
import { Link } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";

const Empty = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <Link to="/" className={`${styles.link} ${styles.title} flexbox-center`}>
          <FaBlogger className={styles.logoIcon} />  Blogger
          </Link>
        </div>
      </div>
      <div className={styles.main}>
        <p className={styles.mainHeading}>404</p>
        <p className={styles.mainTitle}>Lost Your Way ?</p>
        <p className={styles.mainContent}>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <p className={styles.mainContent}>
          To return to Blogger Homepage click on button below.
        </p>
        <Link to="/" className={`${styles.link} ${styles.emptyBtn}`}>
          Blogger
        </Link>
      </div>
    </div>
  );
};

export default Empty;
