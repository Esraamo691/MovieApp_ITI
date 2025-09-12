import React, { useEffect, useState } from "react";
import style from "./TvShow.module.css";

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

function TvShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results || []);
      })
      .catch((err) => console.error("Error fetching TV shows:", err));
  }, []);

  return (
    <div className={`${style.container} py-4`}>
      <div className="d-flex align-items-center mb-4">
        <div className={`${style.titleBar} me-3`}></div>
        <h3 className="fw-bold text-light mb-0">TV Shows</h3>
      </div>

      <div className={`${style.row} row`}>
        {shows.map((show) => (
          <div key={show.id} className={`${style.col} col-12 col-sm-6 col-md-3 col-lg-3`}>
            <div className={`${style.card} position-relative`}>
              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className={`${style.poster}`}
              />

              {/* Rating */}
              <span className={`${style.rating} position-absolute`}>
                ⭐ {show.vote_average.toFixed(1)}
              </span>

              {/* Favourite Icon */}
              <span className={`${style.favIcon} position-absolute`}>
                ♡
              </span>

              {/* Title */}
              <h5 className={`${style.title} text-light fw-bold mt-2 mb-1`}>{show.name}</h5>
              
              {/* Year */}
              <p className={`${style.year} text-secondary mb-2`}>
                {show.first_air_date
                  ? new Date(show.first_air_date).getFullYear()
                  : "N/A"}
              </p>

              {/* Overview */}
              <p className={`${style.overview} text-light`}>
                {show.overview
                  ? show.overview.split(" ").slice(0, 20).join(" ") + "..."
                  : "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TvShows;


