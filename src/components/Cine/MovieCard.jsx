import { useContext, useState } from "react";
import { MovieContext } from "../../context";
import { getImageUrl } from "../../utlis/cine-utlis";
import MovieDetalis from "./MovieDetalis";
import Rating from "./Rating";

/* eslint-disable react/prop-types */
export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { cartData, setCartData } = useContext(MovieContext);

  const handleModalClose = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleAddToCart = (event, movie) => {
    event.stopPropagation(); // Prevent modal from opening when clicking the button
    const found = cartData.find((item) => item.id === movie.id);

    if (!found) {
      setCartData([...cartData, movie]);
    } else {
      alert(`The movie "${movie.title}" is already in the cart.`);
    }
  };

  return (
    <>
      {showModal && (
        <MovieDetalis
          movie={selectedMovie}
          onClose={handleModalClose}
          onAddCart={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleMovieSelection(movie)}
          className="cursor-pointer"
        >
          <img
            className="w-full object-cover"
            src={getImageUrl(movie.cover)}
            alt={`${movie.title} cover`}
          />
        </div>
        <figcaption className="pt-4">
          <h3 className="text-xl mb-1">{movie.title}</h3>
          <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
          <div className="flex items-center space-x-1 mb-5">
            <Rating value={movie.rating} />
          </div>
          <button
            onClick={(e) => handleAddToCart(e, movie)}
            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
          >
            <span>${movie.price} | Add to Cart</span>
          </button>
        </figcaption>
      </figure>
    </>
  );
}
