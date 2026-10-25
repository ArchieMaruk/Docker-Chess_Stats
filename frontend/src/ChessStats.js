import { useEffect, useState } from "react";
import "./App.css";

function ChessStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/chess/daddy_gremlin")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="App">

      <h1>Chess Stats for daddy_gremlin</h1>
      <p><strong>Blitz Rating:</strong> {stats.chess_blitz?.last?.rating}</p>
      <p><strong>Rapid Rating:</strong> {stats.chess_rapid?.last?.rating}</p>
      <p><strong>Puzzle Rush Best Score:</strong> {stats.puzzle_rush?.best?.score}</p>
    </div>
  );
}

export default ChessStats;
