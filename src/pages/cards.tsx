import React from 'react';
import { api } from '~/utils/api';
import Carousel from '~/components/Carousel/Carousel';

const Cards = () => {
  const { data: flashcards, isLoading } = api.flashcards.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;
  return flashcards ? <Carousel words={flashcards} /> : null;
};

export default Cards;
