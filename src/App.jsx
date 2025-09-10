import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Pages/Home/Home";
import MovieDetails from "./Components/Pages/MovieDetails/MovieDetails";
import MovieList from "./Components/Pages/MovieList/MovieList";
import SearchList from "./Components/Pages/SearchResult/SearchList";
import WishList from "./Components/Pages/WishList/WishList";
import EmptyWishList from "./Components/Pages/WishList/EmptyWishList";
import NotFound from "./Components/NotFound";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/details", element: <MovieDetails /> },
        { path: "/Movie-list", element: <MovieList /> },
        { path: "/search", element: <SearchList /> },
        { path: "/watch-list", element: <WishList /> },
        { path: "/empty-list", element: <EmptyWishList /> },
        { path: "*", element: <NotFound/> },
      ],
    },
  ]);
  return <>
  <RouterProvider router={router} />
  
  </>;
}

