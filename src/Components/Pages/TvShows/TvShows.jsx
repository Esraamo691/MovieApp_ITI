import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import style from "../MovieList/MovieList.module.css";
import { useLoading } from "../../Context/LoadingContext.jsx";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom"; 
import { useWishlist } from "../../Context/WishListContext.jsx";
import { toast, Bounce } from "react-toastify";
=======
import style from "./TvShows.module.css";
import { useLoading } from "../../Context/LoadingContext.jsx";

>>>>>>> origin/marwa
function TvShows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();
<<<<<<< HEAD
  const { wishlist, toggleWishlist } = useWishlist();
=======
>>>>>>> origin/marwa

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV shows:", err);
        setLoading(false);
      });
  }, [page, setLoading]);
<<<<<<< HEAD
=======

  // دالة pagination
  const renderPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };
>>>>>>> origin/marwa

  return (
    <div className={`${style.body}`}>
      <div className="container-fluid">
<<<<<<< HEAD
        <p className={`${style.par}`}>Tv Shows</p>
        <div className="row g-4">
          {shows.map((show) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={show.id}>
              <div className={`${style.card} h-100 position-relative`}>
                <div
                  className={`${style.icon} d-flex justify-content-center align-items-center`}
                  onClick={() => {
                    toggleWishlist(show);
                    if (wishlist.some((m) => m.id === show.id)) {
                      toast.info(`${show.name} removed from favourites!`, {
                        transition: Bounce,
                      });
                    } else {
                      toast.success(`${show.name} added to favourites!`, {
                        transition: Bounce,
                      });
                    }
                  }}
                >
                  <i
                    className={`fa${
                      wishlist.some((m) => m.id === show.id) ? "s" : "r"
                    } fa-heart`}
                  ></i>
                </div>


                <Link
                  to={`/tv/${show.id}`}
                  className="text-decoration-none d-block text-reset h-100"
                >
                  <img
                    src={
                      show.poster_path
                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    className="w-100 img-fluid"
                    alt={show.name}
                  />
                  <div className="card-body px-3">
                    <p className={`fw-bold m-0 fs-4 ${style.tite}`}>
                      {show.name?.split(" ").length > 4
                        ? show.name.split(" ").slice(0, 4).join(" ") + "..."
                        : show.name}
                    </p>
                    <p>{show.first_air_date?.split("-")[0]}</p>
                    <p>
                      {show.overview?.split(" ").length > 30
                        ? show.overview.split(" ").slice(0, 30).join(" ") +
                          "..."
                        : show.overview}
                    </p>
                  </div>
                  <p className={`${style.pop}`}>
                    <StarBorderIcon className={`${style.star}`} />
                    {typeof show.vote_average === "number" ? show.vote_average.toFixed(2) : "N/A"}
                  </p>
                </Link>
=======
        <div className="row g-4">
          {shows.map((show) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={show.id}>
              <div className={`${style.card} h-100`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  className="w-100 img-fluid"
                  alt={show.name}
                />
                <div className="card-body px-3">
                  <p className="fw-bold m-0 fs-4">
                    {show.name?.split(" ").length > 4
                      ? show.name.split(" ").slice(0, 4).join(" ") + "..."
                      : show.name}
                  </p>
                  <p>{show.first_air_date?.split("-")[0]}</p>
                  <p>
                    {show.overview?.split(" ").length > 30
                      ? show.overview.split(" ").slice(0, 30).join(" ") + "..."
                      : show.overview}
                  </p>
                </div>
                <div className={`${style.icon} d-flex justify-content-center align-items-center`}>
                  <i className="far fa-heart"></i>
                </div>
>>>>>>> origin/marwa
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
<<<<<<< HEAD
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
              <PaginationItem
              className="text-white"
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
=======
        <nav aria-label="Page navigation example" className="mt-5">
          <ul className={`pagination justify-content-center ${style.pagination}`}>
            {/* Previous */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => page > 1 && setPage(page - 1)}
              >
                Previous
              </button>
            </li>

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Last Page */}
            {page < totalPages - 2 && (
              <>
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
                <li
                  className={`page-item ${page === totalPages ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}

            {/* Next */}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => page < totalPages && setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
>>>>>>> origin/marwa
      </div>
    </div>
  );
}

export default TvShows;
