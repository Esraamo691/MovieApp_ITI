import React, { useEffect, useState } from "react";
import style from "../MovieList/MovieList.module.css";
import { useLoading } from "../../Context/LoadingContext.jsx";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom"; // ✅ استيراد اللينك
//wishlist
import { useWishlist } from "../../Context/WishListContext.jsx";
import { toast, Bounce } from "react-toastify";
function TvShows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();
  const { wishlist, toggleWishlist } = useWishlist();

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

  return (
    <div className={`${style.body}`}>
      <div className="container-fluid">
        <p className={`${style.par}`}>Tv Shows</p>
        <div className="row g-4">
          {shows.map((show) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={show.id}>
              <div className={`${style.card} h-100 position-relative`}>
                {/* add or remove from wishlist */}
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

                {/* ✅ خلي الكارت كله يوديك على صفحة التفاصيل */}
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
                    {show.vote_average.toFixed(2)}
                  </p>
                </Link>
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
      </div>
    </div>
  );
}

export default TvShows;
