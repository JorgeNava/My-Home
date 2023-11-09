"use client";
import React from "react";
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyPlayerComponent = ({ token }: { token: string }) => {
  return (
    <SpotifyPlayer
      token={token}
      uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
    />
  );
};

export default SpotifyPlayerComponent;
