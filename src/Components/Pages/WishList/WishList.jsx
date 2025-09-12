import React, { useState, useEffect } from "react";
import styles from "./wishlist.module.css";
import { Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";

const posterUrls = [
  "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
  "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
  "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
];

const generateMovies = (count) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push({
      id: i + 1,
      title: `Movie ${i + 1}`,
      date: `Jan ${i + 1}, 2023`,
      rating: Math.floor(Math.random() * 5) + 1,
      votes: Math.floor(Math.random() * 10000),
      description: `This is the description for Movie ${i + 1}.`,
      poster: posterUrls[i % posterUrls.length],
    });
  }
  return movies;
};

function WishList() {
  const [movies, setMovies] = useState(generateMovies(12));
  const [favorites, setFavorites] = useState([]);
  const [visible, setVisible] = useState([]); 

  useEffect(() => {
    movies.forEach((movie, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, movie.id]);
      }, i * 150);
    });
  }, [movies]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2> Watch List </h2>
      </div>

      <div className={styles.cardsContainer}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`${styles.card} ${
              visible.includes(movie.id) ? styles.show : ""
            }`}
          >
            <div className={styles.posterWrapper}>
              <img src={movie.poster} alt={movie.title} className={styles.poster} />
            </div>

            <div className={styles.details}>
              <div className={styles.cardHeader}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <FaHeart
                  className={`${styles.heartIcon} ${
                    favorites.includes(movie.id) ? styles.active : ""
                  }`}
                  onClick={() => toggleFavorite(movie.id)}
                />
              </div>

              <p className={styles.date}>{movie.date}</p>

              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < movie.rating ? styles.starFilled : styles.starEmpty
                    }
                  />
                ))}
                <span className={styles.votes}>{movie.votes}</span>
              </div>

              <p className={styles.desc}>{movie.description}</p>
              <Button className={styles.btnRemove} variant="light" size="sm">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
