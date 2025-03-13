// app/recommend/page.js
'use client';
import { useState } from 'react';
import MovieCard from '@/components/MovieCard';

export default function RecommendPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(count >= 3) return;

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const { movies, explanation } = await response.json();
      setResults({ movies, explanation });
      setCount(prev => prev + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe movie plots you want to see..."
          className="w-full p-2 border rounded"
          disabled={count >= 3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={count >= 3 || !query}
        >
          Get Recommendations
        </button>
        {count >= 3 && (
          <p className="text-red-500 text-sm">
            Maximum 3 searches reached
          </p>
        )}
      </form>

      {results && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">AI Explanation:</h3>
            <p className="whitespace-pre-wrap">{results.explanation}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Recommended Movies:</h3>
            {results.movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}