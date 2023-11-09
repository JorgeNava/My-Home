import { useEffect } from 'react';

const useSpotifySdk = (onLoadCallback: () => void) => {
  useEffect(() => {
    // Function to be called when the SDK has loaded
    window.onSpotifyWebPlaybackSDKReady = onLoadCallback;

    // Check if the script is already present
    const scriptTag = document.getElementById('spotify-sdk');
    if (!scriptTag) {
      // Create a script tag if it does not exist
      const script = document.createElement('script');
      script.id = 'spotify-sdk';
      script.type = 'text/javascript';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);
    }

    // Cleanup the script and the global function on unmount
    return () => {
      window.onSpotifyWebPlaybackSDKReady = null;
    };
  }, [onLoadCallback]);
};

export default useSpotifySdk;
