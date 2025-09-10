import { useEffect, useState } from "react";
import styles from "../Home/Home.module.css";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const timeRunning = 3000;
  const timeAutoNext = 4000;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = (data.results || []).filter(
          (m) => m.backdrop_path && m.poster_path
        );
        setSlides(results);
        setIndex(0);
      })
      .catch(console.error);
  }, []);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    const auto = setTimeout(() => {
      handleNext();
    }, timeAutoNext);
    return () => clearTimeout(auto);
  }, [index, slides]);

  const handleNext = () => {
    setIndex((prev) => (slides.length > 0 ? (prev + 1) % slides.length : 0));
  };

  const handlePrev = () => {
    setIndex((prev) =>
      slides.length > 0 ? (prev - 1 + slides.length) % slides.length : 0
    );
  };

  // عرض كل كارت thumbnail (150px + 20px gap تقريبًا)
  const itemWidth = 170;
  const visibleCount = 5; // عدد الكروت اللي عايزهم يبانوا مرة واحدة
  const offset = Math.max(0, index - (visibleCount - 1));
  const translateX = -offset * itemWidth;

  return (
    <div className={styles.carousel}>
      {/* Slides list */}
      <div className={styles.list}>
        {slides.map((movie, i) => (
          <div
            key={movie.id}
            className={`${styles.item} ${i === index ? styles.itemActive : ""}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className={styles.content}>
              <div className={styles.author}>TMDB</div>
              <div className={styles.title}>{movie.title}</div>
              <div className={styles.topic}>
                {movie.release_date?.slice(0, 4)}
              </div>
              <div className={styles.des}>{movie.overview}</div>
              <div className={styles.buttons}>
                <button>SEE MORE</button>
                <button>ADD TO WISHLIST</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnail}>
        <div
          className={styles.thumbnailTrack}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {slides.map((movie, i) => (
            <div
              key={movie.id}
              className={`${styles.thumbnailItem} ${
                i === index ? styles.thumbnailActive : ""
              }`}
              onClick={() => setIndex(i)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className={styles.arrows}>
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>

      {/* Progress bar */}
      <div
        key={index}
        className={styles.time}
        style={{ animation: `runningTime ${timeRunning / 1000}s linear` }}
      />
    </div>
  );
}
