import dynamic from 'next/dynamic';
import { cookies } from 'next/headers'
import configProvider from '../_libs/config-provider';

const SpotifyPlayerComponent = dynamic(
  () => import('../_componets/spotify-player'),
  { ssr: false }
);


export default function Music() {
  /* 
    TODO: https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started
  */

  const clientId = configProvider.get('spotify.clientId');
  const redirectUri = configProvider.get('spotify.redirectUri');
  console.log('[NAVA] clientId', clientId);
  console.log('[NAVA] redirectUri', redirectUri);

    // TODO: PASS TO COOKIES SERVICE
    const spotifyKey = 'spotify'
    const spotifyCookie = cookies().get(spotifyKey)?.value;
    const spotifyAccessToken = spotifyCookie ? JSON.parse(spotifyCookie)?.accessToken : null;
    console.log('[NAVA] spotifyAccessToken', spotifyAccessToken);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Music page
        </p>
        {spotifyAccessToken && <SpotifyPlayerComponent token={spotifyAccessToken} />}
      </div>
    </main>
  )
}
