import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../MovieList/MovieList.module.css";
import { useLoading } from "../../Context/LoadingContext.jsx";

export default function SearchList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();
  const location = useLocation();

  // جلب query من الـ URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  useEffect(() => {
    if (!searchTerm) return;

    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${page}`;

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
  }, [searchTerm, page, setLoading]);

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

  return (
    <div className={`${style.body}`}>
      <div className="container-fluid">
        <h2 className="my-4 text-white">Search Results for "{searchTerm}"</h2>

        <div className="row g-4">
          {movies.length === 0 ? (
            <p className=" text-white">No results found</p>
          ) : (
            movies.map((movie) => (
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
                        ? movie.overview.split(" ").slice(0, 30).join(" ") +
                          "..."
                        : movie.overview}
                    </p>
                  </div>
                  <div
                    className={`${style.icon}  d-flex justify-content-center align-items-center`}
                  >
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {movies.length > 0 && (
          <nav aria-label="Page navigation example" className="mt-5">
            <ul className="pagination justify-content-center">
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
                    className={`page-item ${
                      page === totalPages ? "active" : ""
                    }`}
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
        )}
      </div>
    </div>
  );
}
