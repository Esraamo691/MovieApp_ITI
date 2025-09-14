import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "../Navbar/Navbar.module.css";
import { useWishlist } from "../Context/WishListContext.jsx"; //import wishlist
export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-transparent fixed-top px-3 ${styles.navbar}`}
    >
      <div className="container-fluid">
        <a className={`${styles.logo} text-uppercase`} href="/">
          Movistan
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? `nav-link d-flex align-items-center gap-1 ${styles.activeLink}`
                    : "nav-link d-flex align-items-center gap-1"
                }
              >
                <MovieIcon fontSize="small" />
                <span>Movies</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/tv-show"
                className={({ isActive }) =>
                  isActive
                    ? `nav-link d-flex align-items-center gap-1 ${styles.activeLink}`
                    : "nav-link d-flex align-items-center gap-1"
                }
              >
                <TvIcon fontSize="small" />
                <span>TV Shows</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/watch-list"
                className={({ isActive }) =>
                  isActive
                    ? `nav-link  d-flex align-items-center position-relative ${styles.activeLink}`
                    : "nav-link d-flex align-items-center position-relative "
                }
              >
                {/*lenght of wishlist*/}
                Favourites{" "}
                <span className={`${styles.favBadge} ms-2`}>
                  {wishlist.length}
                </span>
              </NavLink>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className={`form-control me-2 ${styles.formInput}`}
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={`btn ${styles.btn}`} type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
