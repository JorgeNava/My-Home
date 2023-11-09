'use client'
import React, { useState, useEffect } from "react";

// Assuming 'Spotify' is properly defined in the global scope
declare global {
  interface Window {
    Spotify: any; // Ideally, you should replace 'any' with a more specific type or interface
  }
}

type SpotifyPlayerInstance = {
  _options: {
    getOAuthToken: (callback: (token: string) => void) => void;
  };
};

const SpotifyPlayerComponent = ({ token }: { token: string }) => {
  console.log('[NAVA] SpotifyPlayerComponent token', token);
  const [player, setPlayer] = useState<SpotifyPlayerInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Assuming you want to manage volume state
  const apiEndpoint = "https://api.spotify.com/v1/me/player"; // Replace with your actual endpoint

  useEffect(() => {
    if (window.Spotify && token) {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Next.js Spotify Player",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      // Add all your event listeners here

      // Set player in state
      setPlayer(spotifyPlayer);
    }
  }, [token]);

  // ... (other parts of your component)

  const togglePlayback = async () => {
    if (!player) return;

    const method = isPlaying ? "pause" : "play";
    console.log('[NAVA] `${apiEndpoint}/${method}`', `${apiEndpoint}/${method}`);
    await fetch(`${apiEndpoint}/${method}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsPlaying(!isPlaying); // Update the isPlaying state
  };

  // Function to skip to next track
  const skipToNext = async () => {
    if (!player) return;
    console.log('[NAVA] `${apiEndpoint}/next`', `${apiEndpoint}/next`);
    await fetch(`${apiEndpoint}/next`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Function to skip to previous track
  const skipToPrevious = async () => {
    if (!player) return;

    await fetch(`${apiEndpoint}/previous`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Function to set volume
  const setPlayerVolume = async (newVolume: number) => {
    setVolume(newVolume); // Update local state
    if (!player) return;

    console.log('[NAVA] `${apiEndpoint}/volume?volume_percent=${newVolume * 100}`', `${apiEndpoint}/volume?volume_percent=${newVolume * 100}`);

    await fetch(`${apiEndpoint}/volume?volume_percent=${newVolume * 100}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="spotify-player">
      <button onClick={skipToPrevious}>Previous</button>
      <button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={skipToNext}>Next</button>
      <input
        type="range"
        value={volume}
        min={0}
        max={1}
        step={0.01}
        onChange={(e) => setPlayerVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default SpotifyPlayerComponent;
