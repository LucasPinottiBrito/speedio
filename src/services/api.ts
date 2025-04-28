const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchTodayGame = async () => {
  const response = await fetch(API_URL+'/api/today_game');
  if (!response.ok) throw new Error('Failed to fetch game data');
  return response.json();
};

export const submitGuess = async (guess: number) => {
  const response = await fetch(API_URL+'/api/try', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess })
  });
  return response.json();
};