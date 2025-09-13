import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./movie.module.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const sliderSettings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    variableWidth: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  }), []);

  const getStarRating = (rating) => {
    if (!rating && rating !== 0) return "☆☆☆☆☆";
    const fullStars = Math.floor(rating / 2);
    const hasHalf = (rating % 2) >= 1;
    return '★'.repeat(fullStars) + (hasHalf ? '½' : '☆') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
  };

  const fetchMovieDetails = (movieId) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Movie details fetch failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const movieData = {
          id: data.id,
          title: data.title || "Unknown",
          season: data.release_date ? `Released ${new Date(data.release_date).getFullYear()}` : "Unknown Release",
          image: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "https://via.placeholder.com/400x600?text=No+Image",
          backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : "https://via.placeholder.com/1280x720?text=No+Backdrop",
          rating: getStarRating(data.vote_average),
          genres: data.genres ? data.genres.map((g) => g.name) : ["Drama"],
          description: data.overview || "No description available."
        };
        setCurrentMovie(movieData);
      })
      .catch(err => {
        console.error(err);
        setCurrentMovie(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchRecommendedMovies = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Recommendations fetch failed: ${response.status}`);
        }
        return response.json();
      })
      .then(results => {
        const movies = (results.results || []).slice(0, 8).map(m => ({
          id: m.id,
          title: m.title,
          image: m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"
        }));
        setRecommendedMovies(movies.length > 0 ? movies : [
          { id: 550, title: "Fight Club", image: "https://via.placeholder.com/200x300?text=Fight+Club" },
          { id: 603, title: "The Matrix", image: "https://via.placeholder.com/200x300?text=The+Matrix" }
        ]);
      })
      .catch(err => {
        console.error(err);
        setRecommendedMovies([
          { id: 550, title: "Fight Club", image: "https://via.placeholder.com/200x300?text=Fight+Club" },
          { id: 603, title: "The Matrix", image: "https://via.placeholder.com/200x300?text=The+Matrix" }
        ]);
      });
  };

  useEffect(() => {
    if (!id) {
      navigate("/movies");
      return;
    }
    fetchMovieDetails(id);
    fetchRecommendedMovies(id);
  }, [id, navigate]);

  if (loading) {
    return <div className={styles.loading}>Loading movie details for ID: {id}...</div>;
  }

  if (!currentMovie) {
    return <div className={styles.loading}>Error loading movie. Check console for details.</div>;
  }

  return (
    <div className={styles.movieDetails} style={{ "--backdrop-url": `url(${currentMovie.backdrop})` }}>
      <div className={`${styles.container} text-white ${styles.py5}`}>
        <div className={styles.backButtonContainer}>
          <button onClick={() => navigate("/movies")} className={`btn ${styles.btnFilled}`}>
            ← Back
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.colMd6}>
            <h1 className={styles.display4}>{currentMovie.title}</h1>
            <p className={`${styles.textMuted} ${styles.seasonText}`}>{currentMovie.season}</p>
            <div className={styles.mb2}>
              <span className={styles.ratingText}>{currentMovie.rating}</span>
            </div>
            <div className={styles.mb3}>
              {currentMovie.genres.map((g, i) => (
                <span key={i} className={`${styles.badge} ${styles.bgSecondary} ${styles.me2}`}>{g}</span>
              ))}
            </div>
            <div className={`${styles.mb4} ${styles.dFlex} ${styles.gap2}`}>
              <button className={`btn ${styles.btnFilled}`}>▶ Play</button>
              <button className={`btn ${styles.btnFilled}`}>+ Add</button>
            </div>
            <p className={styles.description}>{currentMovie.description}</p>
          </div>
          <div className={styles.colMd6}>
            <img
              src={currentMovie.image}
              alt={currentMovie.title}
              className={`${styles.imgFluid} ${styles.rounded}`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.recommendedSection} ${styles.container} ${styles.py4}`}>
        <h4 className={`${styles.textWhite} ${styles.mb3}`}>Recommended</h4>
        {recommendedMovies.length > 0 ? (
          <Slider {...sliderSettings}>
            {recommendedMovies.map(m => (
              <Link to={`/movie/${m.id}`} key={m.id} className={`${styles.sliderCard} text-decoration-none`}>
                <img src={m.image} alt={m.title} className={`${styles.imgFluid} ${styles.rounded}`} />
                <p className={`${styles.textCenter} ${styles.textWhite} ${styles.mt2}`}>{m.title}</p>
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