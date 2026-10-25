import { useState } from "react";
import "./App.css";

function ChessStats() {
  const [username, setUsername] = useState("");   // what the user types in the box
  const [player, setPlayer] = useState("");       // the name we last searched for
  const [stats, setStats] = useState(null);       // the stats we got back
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading when the form is sent

    const name = username.trim();
    if (!name) return;

    setLoading(true);
    setError("");
    setStats(null);

    // Ask the backend through Nginx (/api is forwarded to the backend container)
    fetch(`/api/chess/${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(data => {
        setStats(data);
        setPlayer(name);
      })
      .catch(() => setError(`Could not find a Chess.com player called "${name}".`))
      .finally(() => setLoading(false));
  }

  return (
    <div className="App">
      <h1>Chess.com Stats</h1>

      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Chess.com username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {stats && (
        <div className="results">
          <h2>{player}</h2>
          <p><strong>Blitz Rating:</strong> {stats.chess_blitz?.last?.rating ?? "No games"}</p>
          <p><strong>Rapid Rating:</strong> {stats.chess_rapid?.last?.rating ?? "No games"}</p>
          <p><strong>Bullet Rating:</strong> {stats.chess_bullet?.last?.rating ?? "No games"}</p>
          <p><strong>Puzzle Rush Best Score:</strong> {stats.puzzle_rush?.best?.score ?? "Not played"}</p>
        </div>
      )}
    </div>
  );
}

export default ChessStats;
