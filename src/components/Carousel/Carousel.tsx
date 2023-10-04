import React, { useState } from 'react';
import FlashCard from '~/components/FlashCard/FlashCard';

type CarouselProps = {
  words: {
    word: string;
    meaning: string;
    examples: string;
    translation: string;
    image: string;
    id: string;
  }[];
};
const Carousel = ({ words: items }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < items.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="relative">
      <div className="relative mx-auto w-10/12 overflow-hidden rounded-lg">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
          >
            <FlashCard
              id={item.id}
              word={item.word}
              image={item.image}
              meaning={item.meaning}
              translation={item.translation}
              examples={item.examples}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 rounded-full ${
              index === currentSlide
                ? 'bg-gray-800'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center bg-white px-4 focus:outline-none"
        onClick={handlePrevious}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
