import React from "react";
import styles from "../Context/LoadingOverlay.module.css";
import { useLoading } from "../Context/LoadingContext.jsx";

export default function LoadingOverlay() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.floating}`}></div>
      <span className={styles.loader}></span>
    </div>
  );
}
