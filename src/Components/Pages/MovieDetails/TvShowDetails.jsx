import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../MovieDetails/movie.module.css";
import { useLoading } from "../../Context/LoadingContext";
import Loading from "../../Loading/Loading.jsx"; 
const TvShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentShow, setCurrentShow] = useState(null);
  const [recommendedShows, setRecommendedShows] = useState([]);
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

  const fetchShowDetails = (showId) => {
    setLoading(true); 
    fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`TV show details fetch failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const showData = {
          id: data.id,
          title: data.name || "Unknown Show",
          season: data.first_air_date
            ? `First aired ${new Date(data.first_air_date).getFullYear()}`
            : "Unknown Air Date",
          image: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : "https://via.placeholder.com/400x600?text=No+Image",
          backdrop: data.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
            : "https://via.placeholder.com/1280x720?text=No+Backdrop",
          rating: getStarRating(data.vote_average),
          genres: data.genres ? data.genres.map((g) => g.name) : ["Drama"],
          description: data.overview || "No description available.",
          seasons: data.number_of_seasons || 0,
          episodes: data.number_of_episodes || 0,
        };
        setCurrentShow(showData);
      })
      .catch((err) => {
        console.error(err);
        setCurrentShow(null);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const fetchRecommendedShows = (showId) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Recommendations fetch failed: ${response.status}`);
        }
        return response.json();
      })
      .then((results) => {
        const shows = (results.results || []).slice(0, 8).map((s) => ({
          id: s.id,
          title: s.name,
          image: s.poster_path
            ? `https://image.tmdb.org/t/p/w200${s.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image",
        }));
        setRecommendedShows(shows);
      })
      .catch((err) => {
        console.error(err);
        setRecommendedShows([]);
      });
  };

  useEffect(() => {
    if (!id) {
      navigate("/tv-show");
      return;
    }
    fetchShowDetails(id);
    fetchRecommendedShows(id);
  }, [id, navigate]);

 if (loading) return <Loading />; 

  if (!currentShow) {
      return (
        <div className={styles.loading}>
          Error loading movie. Check console for details.
        </div>
      );
    }

  return (
    <div
      className={styles.movieDetails}
      style={{ "--backdrop-url": `url(${currentShow.backdrop})` }}
    >
      <div className={`${styles.container} text-white ${styles.py5}`}>
        <div className={styles.backButtonContainer}>
          <button
            onClick={() => navigate("/tv-show")}
            className={`btn ${styles.btnFilled}`}
          >
            ← Back
          </button>
        </div>
        <div className={styles.row}>
          <div className={`${styles.colMd6 } animate__animated animate__fadeInLeft`}>
            <h1 className={styles.display4}>{currentShow.title}</h1>
            <p className={`${styles.textMuted} ${styles.seasonText}`}>
              {currentShow.season} • {currentShow.seasons} Seasons /{" "}
              {currentShow.episodes} Episodes
            </p>
            <div className={styles.mb2}>
              <span className={styles.ratingText}>{currentShow.rating}</span>
            </div>
            <div className={styles.mb3}>
              {currentShow.genres.map((g, i) => (
                <span
                  key={i}
                  className={`${styles.badge} ${styles.bgSecondary} ${styles.me2}`}
                >
                  {g}
                </span>
              ))}
            </div>
            <p className={styles.description}>{currentShow.description}</p>
          </div>
          <div className={`${styles.colMd6 } animate__animated animate__fadeInRight`}>
            <img
              src={currentShow.image}
              alt={currentShow.title}
              className={`${styles.imgFluid} ${styles.rounded}`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      <div
        className={`${styles.recommendedSection} ${styles.container} ${styles.py4}`}
      >
        <h4 className={`${styles.tex} ${styles.mb3}`}>Recommended</h4>
        {recommendedShows.length > 0 ? (
          <Slider {...sliderSettings} className="h-100">
            {recommendedShows.map((s) => (
              <Link
                to={`/tv/${s.id}`}
                key={s.id}
                className={`${styles.sliderCard} h-100 text-decoration-none`}
              >
               <div className=" text-center d-flex flex-column justify-content-center align-items-center">
                 <img
                  src={s.image}
                  alt={s.title}
                  className={` ${styles.rounded}`}
                />
                <p
                  className={`${styles.textCenter} ${styles.textWhite} ${styles.mt2}`}
                >
                  {s.title.split(" ").slice(0, 3).join(" ")}
                </p>
               </div>
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

export default TvShowDetails;
