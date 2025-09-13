import React, { useEffect, useState } from "react";
import style from "../MovieList/MovieList.module.css";
import { Pagination } from "@mui/material";
import { useLoading } from "../../Context/LoadingContext";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Loading from "../../Loading/Loading.jsx";
export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={`${style.body}`}>
      <div className={`container-fluid`}>
        <p className={`${style.par}`}>Now Playing</p>
        <div className={`row g-4 ${style.row}`}>
          {movies.map((movie) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={movie.id}>
              <div className={`${style.card} h-100`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="w-100 img-fluid"
                  alt={movie.title}
                />
                <div className="card-body px-3">
                  <p className="fw-bold m-0 fs-4">
                    {movie.title?.split(" ").length > 4
                      ? movie.title.split(" ").slice(0, 4).join(" ") + "..."
                      : movie.title}
                  </p>
                  <p>{movie.release_date?.split("-")[0]}</p>
                  <p>
                    {movie.overview?.split(" ").length > 30
                      ? movie.overview.split(" ").slice(0, 30).join(" ") + "..."
                      : movie.overview}
                  </p>
                </div>
                <div
                  className={`${style.icon}  d-flex justify-content-center align-items-center`}
                >
                  <i className="far fa-heart"></i>
                </div>

                <p className={`${style.pop}`}>
                  <StarBorderIcon className={`${style.star}`} />
                  {movie.vote_average.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className=" d-flex justify-content-center mt-5">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            color="secondary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#ccc",
                backgroundColor: "#165c3e",
              },
              "& .MuiPaginationItem-root:hover": {
                color: "#ccc",
                backgroundColor: "#165c3e",
              },

              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#229062",
                color: "#fff",
                boxShadow: "1px 1px 5px #8DB6D9",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
