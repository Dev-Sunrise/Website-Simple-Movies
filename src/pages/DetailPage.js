import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";

const DetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="absolute inset-0 w-full h-screen">
        <div className="absolute inset-0 bg-black bg-opacity-50 overlay"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[500px] max-w-[900px] mx-auto mt-[300px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          className="object-cover w-full h-full rounded-xl"
          alt=""
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white ">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              className="px-4 py-2 border rounded-lg border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="leading-relaxed max-w-[800px] mx-auto text-center mb-10">
        {overview}
      </p>
      <MoviesData type="credits"></MoviesData>
      <MoviesData type="videos"></MoviesData>
      <MoviesData type="similar"></MoviesData>
    </div>
  );
};

function MoviesData({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="mb-10 text-3xl font-bold text-center">Cast</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div
              className="cast-item"
              key={item.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg"
              />
              <h3 className="pt-4 text-xl font-medium text-center">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div key={item.id}>
                <h3 className="inline-block p-3 mb-5 text-xl font-medium rounded-lg bg-secondary">
                  {item.name}
                </h3>
                <div
                  key={item.id}
                  className="w-full aspect-video"
                >
                  <iframe
                    width="885"
                    height="498"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Waka Waka ♫ Top Acoustic Love Songs 2022 ♫  Acoustic Cover Of Popular TikTok Songs"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-fill w-full h-full rounded-3xl"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

export default DetailPage;
