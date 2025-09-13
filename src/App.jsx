import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Pages/Home/Home";
import MovieDetails from "./Components/Pages/MovieDetails/MovieDetails";
import MovieList from "./Components/Pages/MovieList/MovieList";
import SearchList from "./Components/Pages/SearchResult/SearchList";
import WishList from "./Components/Pages/WishList/WishList";
import NotFound from "./Components/NotFound";
import TvShows from "./Components/Pages/TvShows/TvShows";
//import context for wishlist
import { WishlistProvider } from "./Components/Context/WishListContext.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/details", element: <MovieDetails /> },
        { path: "/movies", element: <MovieList /> },
        { path: "/search", element: <SearchList /> },
        { path: "/watch-list", element: <WishList /> },
        { path: "/tv-show", element: <TvShows/> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  );
}
