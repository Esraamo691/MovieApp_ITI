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
import { WishlistProvider } from "./Components/Context/WishListContext.jsx";
import TvShowDetails from "./Components/Pages/MovieDetails/TvShowDetails.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/movies", element: <MovieList /> },
        { path: "movie/:id", element: <MovieDetails /> },
        { path: "/search", element: <SearchList /> },
        { path: "/tv/:id", element: <TvShowDetails /> },
        { path: "/watch-list", element: <WishList /> },
        { path: "/tv-show", element: <TvShows /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <WishlistProvider>
        <RouterProvider router={router} />
        <ScrollToTopButton />
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </WishlistProvider>
    </>
  );
}
