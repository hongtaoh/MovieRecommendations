// app/favorites/page.js
'use client';
import { useFavoriteContext } from '@/context/FavoriteContext';
import MovieCard from '@/components/MovieCard';
import movies from '@/data/movies.json';

export default function FavoritesPage() {
  const { favorites } = useFavoriteContext();
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));

  return (
    <div>
      <h1 className="p-4 text-lg font-bold">Favorite Movies</h1>
      {favoriteMovies.map(movie => (
        <MovieCard 
          key={movie.id}
          movie={movie}
          isFavorite={true}
        />
      ))}
    </div>
  );
}