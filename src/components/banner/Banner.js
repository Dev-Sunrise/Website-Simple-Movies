import React from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
import Button from "../button/Button";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=c0c36b6248307167e7611b2961acf74f`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20">
      <Swiper
        grabCursor={"true"}
        slidesPerView={"auto"}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item }) => {
  const navigate = useNavigate();
  const { title, poster_path, id } = item;
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white content left-5 bottom-5">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Dromo
          </span>
        </div>
        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="px-6 py-3 font-medium text-white rounded-lg bg-primary"
        >
          Watch Now
        </button> */}
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
};

export default Banner;
