import configProvider from "../_libs/config-provider";
import {
  isTokenExpiringSoon,
  refreshToken
} from "../_libs/google";

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

  const PhotosPage = ({ photos }: { photos: any }) => (
    <div>
      {photos.map((photo: any) => {
        if (photo.mimeType === 'image/jpeg') {
          return <img key={photo.id} src={photo.baseUrl} alt="Photo" />;
        } else if (photo.mimeType === 'video/mp4') {
          return (
            <video key={photo.id} src={`${photo.baseUrl}=dv`} controls></video>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <main>
      <h1>Gallery Page</h1>
      <PhotosPage photos={albumPhotos} />
    </main>
  );
};

export default Gallery;
