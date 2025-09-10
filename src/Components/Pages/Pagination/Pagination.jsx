import React, { useState } from "react";
import styles from "../Pagination/Pagination.module.css";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageBtn} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <div className={styles.navBtns}>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
          }
          className={styles.navBtn}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalPages ? prev + 1 : prev
            )
          }
          className={styles.navBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
}
