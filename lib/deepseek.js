// lib/deepseek.js
export async function deepseekExplain(query, movies) {
    // Create detailed movie list
    const movieDetails = movies
      .map(m => `- ${m.title}: ${m.overview.slice(0, 150)}...`) // Truncate overview
      .join('\n');
  
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{
          role: "user",
          content: `Explain in 2-3 natural sentences why these movies match the query "${query}". 
          Consider both titles and plot details. Use everyday language, no technical terms.
          
          Query: ${query}
          Movies:
          ${movieDetails}`
        }]
      })
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  }