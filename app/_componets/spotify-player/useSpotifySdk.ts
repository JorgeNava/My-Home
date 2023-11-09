import { useEffect } from 'react';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: (() => void) | undefined;
    Spotify: any;
  }
}

const useSpotifySdk = (onSdkReady: () => void) => {
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = onSdkReady;

    // Check if the Spotify SDK script is already present
    if (document.getElementById('spotify-sdk')) {
      onSdkReady();
      return;
    }

    // If not, create it and append to the body
    const script = document.createElement('script');
    script.id = 'spotify-sdk';
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup
      window.onSpotifyWebPlaybackSDKReady = undefined;
      document.body.removeChild(script);
    };
  }, [onSdkReady]);
};

export default useSpotifySdk;
