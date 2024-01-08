import configProvider from "../_libs/config-provider";
import {
  isTokenExpiringSoon,
  refreshToken
} from "../_libs/google";
import ExpandableGallery from "../_components/expandable-gallery";

import './style.scss';

const Gallery = async () => {
  const tokenExpiringSoon = await isTokenExpiringSoon();
  const accessToken = tokenExpiringSoon ? await refreshToken() : await configProvider.get("google.accessToken");
  // TODO: Pass Album ID to env variables.
  const albumId = "AFAC0fuYvDXZdq9EbKXr43iUQ684xx3K2BcpNgoMSN_3J0cfIc_IbgUPxREvvCSBsIkoueXJ-YPb";

  const getAlbumPhotos = async (albumId : string) => {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageSize: 100,
        albumId: albumId
      })
    });

    if (!response.ok) {
      throw new Error(`Error while getting Google Photos album photos: ${response.status}`);
    }

    const data = await response.json();
    return data?.mediaItems;
  };

  const albumPhotos = await getAlbumPhotos(albumId);

  return (
    <main>
      <h1>Gallery Page</h1>
      <div className="flex justify-center items-center">
        <ExpandableGallery photos={albumPhotos} imagesPerRow={3} />
      </div>
    </main>
  );
};

export default Gallery;
