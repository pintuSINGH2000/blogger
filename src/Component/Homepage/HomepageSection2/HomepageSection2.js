import React from "react";
import styles from "./homepageSection2.module.css";

const HomepageSection2 = ({ imgSrc, heading, text, isReverse,backgroundColor }) => {
  return (
    <div
      className={styles.container}
      style={{ flexDirection: isReverse ? "row-reverse" : "row",background:backgroundColor }}
    >
      <img src={imgSrc} alt="formbot"width={500} />
      <div className={styles.content}>
        <div className={`${styles.heading} outfit-700`}>{heading}</div>
        <div className={`${styles.text} open-sans`}>{text}</div>
      </div>
    </div>
  );
};

export default HomepageSection2;
