// app/api/recommend/route.js
import { NextResponse } from 'next/server';
import { getGeminiEmbedding } from '@/lib/gemini';
import { qdrantSearch } from '@/lib/qdrant';
import moviesData from '@/data/movies.json';

export async function POST(req) {
  try {
    const { query } = await req.json();
    
    // 1. Get embedding
    const embedding = await getGeminiEmbedding(query);
    
    // 2. Search Qdrant
    const qdrantResults = await qdrantSearch(embedding, 5);
    
    // 3. Match with local data
    const movies = qdrantResults.map(result => {
      const fullData = moviesData.find(m => m.id === result.id);
      return { ...fullData, similarity_score: result.score };
    });

    // 4. Generate explanation
    const explanation = await deepseekExplain(query, movies);

    return NextResponse.json({ 
      movies: movies.sort((a, b) => b.similarity_score - a.similarity_score),
      explanation 
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Recommendation failed: " + error.message },
      { status: 500 }
    );
  }
}