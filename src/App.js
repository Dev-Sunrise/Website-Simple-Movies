import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import DetailPage from "./pages/DetailPage";
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route
              path="/movie"
              element={<MoviePage></MoviePage>}
            ></Route>
            <Route
              path="/movie/:movieId"
              element={<DetailPage></DetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
