import React, { useEffect, useState } from "react";
import style from "../MovieList/MovieList.module.css";
import { useLoading } from "../../Context/LoadingContext.jsx";
//wishlist
import { useWishlist } from "../../Context/WishListContext.jsx";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();

  // wishlist
  const { wishlist, toggleWishlist } = useWishlist();

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
        <div className="row g-4">
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
                
                   {/*add or remove from wishlist*/ }
                <div 
                  className={`${style.icon} d-flex justify-content-center align-items-center`}
                  onClick={() =>toggleWishlist(movie)}
                >
                 <i className={`fa${wishlist.some(m => m.id === movie.id) ? 's' : 'r'} fa-heart`}></i>
                  </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
}
