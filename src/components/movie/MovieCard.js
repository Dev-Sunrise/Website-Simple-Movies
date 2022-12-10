import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, release_date, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[300px] object  -cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button
          full
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Some thing went wrong with this components
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <LoadingSkeleton className="w-full h-[300px] object-cover rounded-lg mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold">
          <LoadingSkeleton
            className="w-full h-5"
            radius="8px"
          ></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton
              width="40px"
              height="10px"
              radius="8px"
            ></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton
              width="40px"
              height="10px"
              radius="8px"
            ></LoadingSkeleton>
          </span>
        </div>

        <LoadingSkeleton
          className="w-full h-[45px]"
          radius="8px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
