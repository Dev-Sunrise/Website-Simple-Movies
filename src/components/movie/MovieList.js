import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      {loading && (
        <>
          <Swiper
            grabCursor={"true"}
            spaceBetween={40}
            slidesPerView={"auto"}
          >
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!loading && (
        <Swiper
          grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}
        >
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
