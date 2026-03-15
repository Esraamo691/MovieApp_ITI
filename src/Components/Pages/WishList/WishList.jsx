<<<<<<< HEAD
import React from "react";
=======
>>>>>>> origin/eman
import { useState } from "react";
import { useWishlist } from "../../Context/WishListContext.jsx";
import EmptyWishList from "./EmptyWishList.jsx";
import { FaStar } from "react-icons/fa";
import styles from "./wishlist.module.css";
<<<<<<< HEAD
import { toast, Bounce } from "react-toastify";
function WishList() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [hoveredId, setHoveredId] = useState(null);

  if (wishlist.length === 0) return <EmptyWishList />;
=======

function WishList() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [hoveredId, setHoveredId] = useState(null);

  if (wishlist.length === 0) return <EmptyWishList />;

>>>>>>> origin/eman
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2>
          <i className="fa-solid fa-heart"></i> My Favourite{" "}
<<<<<<< HEAD
          <span>({wishlist.length})</span>
=======
          <span>[{wishlist.length}]</span>
>>>>>>> origin/eman
        </h2>
      </div>

      <div className={styles.cardsContainer}>
        {wishlist.map((movie, i) => (
          <div
            key={movie.id}
            className={`${styles.card} ${
              hoveredId && hoveredId !== movie.id ? styles.blur : ""
            }`}
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className={styles.posterWrapper}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
<<<<<<< HEAD
                alt={movie.title || movie.name}
=======
                alt={movie.title}
>>>>>>> origin/eman
                className={styles.poster}
              />
              <div
                className={styles.icon}
<<<<<<< HEAD
                onClick={() => {
                  toggleWishlist(movie);
                  if (wishlist.some((m) => m.id === movie.id)) {
                    toast.info(`${movie.title || movie.name} removed from favourites!`, {
                      transition: Bounce,
                    });
                  } else {
                    toast.success(`${movie.title || movie.name} added to favourites!`, {
                      transition: Bounce,
                    });
                  }
                }}
=======
                onClick={() => toggleWishlist(movie)}
>>>>>>> origin/eman
              >
                <i className="fas fa-heart"></i>
              </div>
            </div>

            <div className={styles.details}>
<<<<<<< HEAD
              <h3 className={styles.movieTitle}>{movie.title || movie.name}</h3>
              <p className={styles.date}>{movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0]}</p>
=======
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <p className={styles.date}>
                {movie.release_date?.split("-")[0]}
              </p>
>>>>>>> origin/eman

              <div className={styles.rating}>
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={
                      idx < Math.round(movie.vote_average / 2)
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  />
                ))}
                <span className={styles.ratingNumber}>
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>

              <p className={styles.desc}>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
