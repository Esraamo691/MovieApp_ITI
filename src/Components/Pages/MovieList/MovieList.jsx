import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../MovieList/MovieList.module.css";
<<<<<<< HEAD
import { Pagination, PaginationItem } from "@mui/material";
import { useLoading } from "../../Context/LoadingContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Loading from "../../Loading/Loading.jsx";
import { useWishlist } from "../../Context/WishListContext.jsx";
import { toast, Bounce } from "react-toastify";
=======
import { useLoading } from "../../Context/LoadingContext.jsx";
//wishlist
import { useWishlist } from "../../Context/WishListContext.jsx";

>>>>>>> origin/eman
export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
<<<<<<< HEAD
  const { loading, setLoading } = useLoading();
  const { wishlist, toggleWishlist } = useWishlist();
=======
  const { setLoading } = useLoading();

  // wishlist
  const { wishlist, toggleWishlist } = useWishlist();

>>>>>>> origin/eman
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`${style.body}`}>
      <div className="container-fluid">
        <p className={`${style.par}`}>Now Playing</p>
        <div className={`row g-4 ${style.row}`}>
          {movies.map((movie) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={movie.id}>
              <div className={`${style.card} h-100 position-relative`}>
                {/*add or remove from wishlist*/}
                <div
                  className={`${style.icon} d-flex justify-content-center align-items-center`}
                 
                  onClick={() => {
                    toggleWishlist(movie);
                    if (wishlist.some((m) => m.id === movie.id)) {
                      toast.info(`${movie.title} removed from favourites!`, {
                        transition: Bounce,
                      });
                    } else {
                      toast.success(`${movie.title} added to favourites!`, {
                        transition: Bounce,
                      });
                    }
                  }}
                >  
                  <i
                    className={`fa${
                      wishlist.some((m) => m.id === movie.id) ? "s" : "r"
                    } fa-heart`}
                  ></i>
                </div>
<<<<<<< HEAD

                <Link
                  to={`/movie/${movie.id}`}
                  className="text-decoration-none d-block text-reset h-100"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    className="w-100 img-fluid"
                    alt={movie.title}
                  />
                  <div className="card-body px-3">
                    <p className={`fw-bold m-0 fs-4 ${style.tite}`}>
                      {movie.title?.split(" ").length > 4
                        ? movie.title.split(" ").slice(0, 4).join(" ") + "..."
                        : movie.title}
                    </p>
                    <p>{movie.release_date?.split("-")[0]}</p>
                    <p>
                      {movie.overview?.split(" ").length > 30
                        ? movie.overview.split(" ").slice(0, 30).join(" ") +
                          "..."
                        : movie.overview}
                    </p>
                  </div>

                  <p className={`${style.pop}`}>
                    <StarBorderIcon className={`${style.star}`} />
                   {typeof movie.vote_average === "number" ? movie.vote_average.toFixed(2) : "N/A"}
                  </p>
                </Link>
=======
                
                   {/*add or remove from wishlist*/ }
                <div 
                  className={`${style.icon} d-flex justify-content-center align-items-center`}
                  onClick={() =>toggleWishlist(movie)}
                >
                 <i className={`fa${wishlist.some(m => m.id === movie.id) ? 's' : 'r'} fa-heart`}></i>
                  </div>

                
>>>>>>> origin/eman
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className=" d-flex justify-content-center mt-5">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            color="secondary"
            siblingCount={2}
            boundaryCount={1}
            renderItem={(item) => (
              <PaginationItem className="text-white"
                {...item}
                sx={{
                  "&.MuiPaginationItem-root": {
                    color: "#ccc",
                    backgroundColor: "#1b305b",
                  },
                  "&.MuiPaginationItem-root:hover": {
                    color: "#ccc",
                    backgroundColor: "#3179b8",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#3179b8",
                    color: "#fff",
                    boxShadow: "1px 1px 5px #3179b8",
                  },
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
