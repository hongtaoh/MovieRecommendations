// components/MovieCard.js
'use client';
import Link from 'next/link';
import { useFavoriteContext } from '@/context/FavoriteContext';

const MovieCard = ({ movie, isFavorite }) => {
  const { toggleFavorite } = useFavoriteContext();
  const posterUrl = `https://image.tmdb.org/t/p/w92${movie.poster_path}`;

  return (
    <div className="flex items-start gap-4 p-4 border-b hover:bg-gray-50 h-32">
      {/* Poster */}
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-16 h-24 object-cover rounded"
      />
      
      {/* Text Content */}
      <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
        <Link href={`/movies/${movie.id}`} className="block">
          <h3 className="font-medium line-clamp-1">
            {movie.title} 
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{movie.overview}</p>
        </Link>
      </div>
      
      {/* Favorite Button */}
      <button 
        onClick={() => toggleFavorite(movie.id)}
        className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
      >
        ♥
      </button>
    </div>
  );
};

export default MovieCard;