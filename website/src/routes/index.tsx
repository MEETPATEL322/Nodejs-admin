import React from "react";
import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layout/Layout";
import List from "../pages/List";
import Detail from "../pages/Detail";
import Tvshows from "../pages/Tvshows";
import Moviesdata from "../pages/Moviesdata";
import TvDetail from "../pages/TvDetail";
import Qurated from "../pages/Qurated";
import News from "../pages/News";
import QuratedDetail from "../pages/QuratedDetail";
import NewsDetail from "../pages/NewsDetail";
import MoviesDetail from "../pages/MoviesDetail";
// import MoviesPageFilter from "../pages/MoviesPageFilter";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

const Home = Loadable(lazy(() => import("../pages/Home")));

export default function Routes() {
  const RoutedComponent = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/movie-list/:id",
      element: <Layout />,
      children: [{ path: "", element: <List /> }],
    },
    {
      path: "/detail/:id",
      element: <Layout />,
      children: [{ path: "", element: <Detail /> }],
    },
    {
      path: "/tvdetails/:id",
      element: <Layout />,
      children: [{ path: "", element: <TvDetail /> }],
    },
    {
      path: "/qurateddetails/:id",
      element: <Layout />,
      children: [{ path: "", element: <QuratedDetail /> }],
    },
    {
      path: "/newsdetails/:id",
      element: <Layout />,
      children: [{ path: "", element: <NewsDetail /> }],
    },
    {
      path: "/tvshows",
      element: <Layout />,
      children: [{ path: "", element: <Tvshows /> }],
    },
    {
      path: "/movies/:id",
      element: <Layout />,
      children: [{ path: "", element: <List /> }],
    },
    {
      path: "/movies/:id/:lang",
      element: <Layout />,
      children: [
        { path: "", element: <List /> },
      ],
    },
    {
      path: "/movies/",
      element: <Layout />,
      children: [{ path: "", element: <Moviesdata /> }],
    },
    {
      path: "/curatedcontent/:name",
      element: <Layout />,
      children: [{ path: "", element: <Qurated /> }],
    },
    {
      path: "/news/:name",
      element: <Layout />,
      children: [{ path: "", element: <News /> }],
    },
    {
      path: "/news",
      element: <Layout />,
      children: [{ path: "", element: <News /> }],
    },
    {
      path: "/curatedcontent",
      element: <Layout />,
      children: [{ path: "", element: <Qurated /> }],
    },

    // ==============Tv list====================

    








  ]);

  return <>{RoutedComponent}</>;
}
