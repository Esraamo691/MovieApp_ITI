import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./movie.module.css";
import { useLoading } from "../../Context/LoadingContext";
import Loading from "../../Loading/Loading.jsx";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const { loading, setLoading } = useLoading();
  const API_KEY = import.meta.env.VITE_API_KEY;

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      centerPadding: "0px",
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    }),
    []
  );

  const getStarRating = (rating) => {
    if (!rating && rating !== 0) return "☆☆☆☆☆";
    const fullStars = Math.floor(rating / 2);
    const hasHalf = rating % 2 >= 1;
    return (
      "★".repeat(fullStars) +
      (hasHalf ? "½" : "☆") +
      "☆".repeat(5 - fullStars - (hasHalf ? 1 : 0))
    );
  };

  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error("Movie details fetch failed");
      const data = await response.json();
      setCurrentMovie({
        id: data.id,
        title: data.title || "Unknown",
        season: data.release_date
          ? `Released ${new Date(data.release_date).getFullYear()}`
          : "Unknown Release",
        image: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : "https://via.placeholder.com/400x600?text=No+Image",
        backdrop: data.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
          : "https://via.placeholder.com/1280x720?text=No+Backdrop",
        rating: getStarRating(data.vote_average),
        genres: data.genres ? data.genres.map((g) => g.name) : ["Drama"],
        description: data.overview || "No description available.",
      });
    } catch (err) {
      console.error(err);
      setCurrentMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedMovies = async (movieId, type = "movie") => {
    try {
      const url =
        type === "movie"
          ? `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Recommendations fetch failed");
      const results = await response.json();
      setRecommendedMovies(
        (results.results || []).slice(0, 8).map((m) => ({
          id: m.id,
          title: m.title || m.name,
          image: m.poster_path
            ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image",
          type: type,
        }))
      );
    } catch (err) {
      console.error(err);
      setRecommendedMovies([]);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/movies");
      return;
    }
    fetchMovieDetails(id);
    fetchRecommendedMovies(id); 
  }, [id, navigate]);

  if (loading) return <Loading />;

  if (!currentMovie) {
    return (
      <div className={styles.loading}>
        Error loading movie. Check console for details.
      </div>
    );
  }

  return (
    <div
      className={styles.movieDetails}
      style={{ "--backdrop-url": `url(${currentMovie.backdrop})` }}
    >
      <div className={`${styles.container} text-white ${styles.py5}`}>
        <div className={styles.backButtonContainer}>
          <button
            onClick={() => navigate("/movies")}
            className={`btn ${styles.btnFilled}`}
          >
            ← Back
          </button>
        </div>
        <div className={styles.row}>
          <div className={`${styles.colMd6 } animate__animated animate__fadeInLeft`}>
            <h1 className={styles.display4}>{currentMovie.title}</h1>
            <p className={`${styles.textMuted} ${styles.seasonText}`}>
              {currentMovie.season}
            </p>
            <div className={styles.mb2}>
              <span className={styles.ratingText}>{currentMovie.rating}</span>
            </div>
            <div className={styles.mb3}>
              {currentMovie.genres.map((g, i) => (
                <span
                  key={i}
                  className={`${styles.badge} ${styles.bgSecondary} ${styles.me2}`}
                >
                  {g}
                </span>
              ))}
            </div>
            <div className={`${styles.mb4} ${styles.dFlex} ${styles.gap2}`}>
              <button className={`btn ${styles.btnFilled}`}>
                <i className="fas fa-play"></i> Play
              </button>
              <button className={`btn ${styles.btnFilled}`}>+ Add</button>
            </div>
            <p className={styles.description}>{currentMovie.description}</p>
          </div>
          <div className={`${styles.colMd6 } animate__animated animate__fadeInRight`}>
            <img
              src={currentMovie.image}
              alt={currentMovie.title}
              className={`${styles.imgFluid} ${styles.rounded}`}
            />
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div
        className={`${styles.recommendedSection} ${styles.container} ${styles.py4}`}
      >
        <h2 className={`${styles.tex} ${styles.mb3}`}>Recommended</h2>
        {recommendedMovies.length > 0 ? (
          <Slider {...sliderSettings} className="h-100">
            {recommendedMovies.map((m) => (
              <Link
                to={`/${m.type}/${m.id}`}
                key={m.id}
                className={`${styles.sliderCard} ${
                  m.type === "tv" ? styles.tvCard : ""
                } h-100 text-decoration-none`}
              >
                <img
                  src={m.image}
                  alt={m.title}
                  className={`${styles.sliderImg} ${
                    m.type === "tv" ? styles.tvImg : ""
                  } ${styles.rounded}`}
                />
                <p className={`${styles.textCenter} ${styles.textWhite} ${styles.mt2}`}>
                  {m.title.split(" ").slice(0, 3).join(" ")}
                </p>
              </Link>
            ))}
          </Slider>
        ) : (
          <p className={styles.textWhite}>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
