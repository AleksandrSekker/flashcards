import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface FlashCardProps {
  id: string;
  word: string;
  meaning: string;
  examples: string;
  translation: string;
  image: string;
}

const FlashCard = ({
  id,
  word,
  image,
  meaning,
  translation,
  examples,
}: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative h-full w-full transform cursor-pointer rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800`}
      key={id}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence mode="wait">
        {isFlipped ? (
          <motion.div
            key="back"
            className="absolut h-full w-full bg-white p-4 dark:bg-gray-800"
            initial={{ opacity: 0, rotateY: -180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 180 }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid-c mb-4 grid grid-cols-3">
              <Image
                src={image}
                alt="Flashcard Image"
                className="h-48 w-48 rounded-lg object-cover"
                width={300}
                height={300}
              />
              <div className="col-span-2 text-gray-600 dark:text-gray-300">
                <p className="mb-2 font-semibold">Examples:</p>
                <p>{examples}</p>
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2 font-semibold">Meaning:</p>
              <p>{meaning}</p>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2 font-semibold">Examples:</p>
              <p>{examples}</p>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2 font-semibold">Translation:</p>
              <p>{translation}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            className="flex w-full flex-col items-center justify-between"
            initial={{ opacity: 1, rotateY: 0 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -180 }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className={`text-4xl font-semibold text-gray-900 dark:text-white`}
            >
              {word.charAt(0).toUpperCase() + word.slice(1)}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashCard;
