import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Pages/Home/Home";
import MovieDetails from "./Components/Pages/MovieDetails/MovieDetails";
import MovieList from "./Components/Pages/MovieList/MovieList";
import SearchList from "./Components/Pages/SearchResult/SearchList";
import WishList from "./Components/Pages/WishList/WishList";
import TvShows from "./Components/Pages/TvShows/TvShows";
import ScrollToTopButton from "./Components/ScrollToTop";
import NotFound from "./Components/NotFound/NotFound";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/details", element: <MovieDetails /> },
        { path: "movie/:id", element: <MovieDetails /> },
        { path: "/search", element: <SearchList /> },
        { path: "/watch-list", element: <WishList /> },
        { path: "/tv-show", element: <TvShows/> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ScrollToTopButton />
    </>
  );
}
