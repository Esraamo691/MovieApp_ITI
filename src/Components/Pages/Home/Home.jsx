import { useEffect, useState } from "react";
import styles from "../Home/Home.module.css";
import { useLoading } from "../../Context/LoadingContext";
import Loading from "../../Loading/Loading.jsx";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useWishlist } from "../../Context/WishListContext.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const timeRunning = 3000;
  const timeAutoNext = 2000;
  const { loading, setLoading } = useLoading();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const results = (data.results || []).filter(
          (m) => m.backdrop_path && m.poster_path
        );
        setSlides(results);
        setIndex(0);
        setLoading(false);
      })
      .catch(console.error);
    setLoading(false);
  }, []);

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

  const itemWidth = 170;
  const visibleCount = 5;
  const offset = Math.max(0, index - (visibleCount - 1));
  const translateX = -offset * itemWidth;

  console.log(loading);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.carousel}>
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
            <div
              className={`${styles.content} animate__animated animate__zoomInLeft`}
            >
              <div className={styles.author}>TMDB</div>
              <p className={`${styles.title}`}>
                {movie.title.split(" ").slice(0, 4).join(" ")}
              </p>
              <div className={styles.topic}>
                {movie.release_date?.slice(0, 4)}
              </div>
              <p>
                <StarBorderIcon className={`${styles.star}`} />
                {movie.vote_average != null
                  ? movie.vote_average.toFixed(2)
                  : "N/A"}
              </p>
              <div className={styles.des}>
                {movie.overview.split(" ").slice(0, 35).join(" ")}
              </div>
              <div className={`${styles.buttons}`}>
                <button className={`${styles.btnPrimary}`}>
                  <Link
                    to={`/movie/${movie.id}`}
                    className="text-decoration-none d-block text-reset h-100"
                  >
                    <i className="fas fa-play"></i>
                    WATCH
                  </Link>
                </button>
                <button
                  className={styles.btnSecondary}
                  onClick={() => toggleWishlist(movie)}
                >
                  {wishlist.some((m) => m.id === movie.id)
                    ? "REMOVE FROM FAVOURITE"
                    : "ADD TO FAVOURITE"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

      <div className={styles.arrows}>
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>

      <div
        key={index}
        className={styles.time}
        style={{ animation: `runningTime ${timeRunning / 1000}s linear` }}
      />
    </div>
  );
}
