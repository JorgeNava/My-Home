require('dotenv').config();
const { google } = require('googleapis');
const AWS = require('aws-sdk');
//const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Load environment variables
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
  GOOGLE_ALBUM_ID
} = process.env;

// Initialize Google Photos API client
const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const photos = google.photos({
  version: 'v1',
  auth
});

// Initialize AWS S3
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();

// Function to download photo and upload to S3
async function downloadAndUploadPhoto(mediaItem) {
  try {
    const photoResponse = await fetch(`${mediaItem.baseUrl}=d`);
    const buffer = await photoResponse.buffer();

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${mediaItem.id}.jpg`,
      Body: buffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read' // Make sure you want the photo to be publicly readable
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    console.log(`Successfully uploaded ${mediaItem.id}: ${uploadResult.Location}`);
  } catch (error) {
    console.error(`Error downloading or uploading ${mediaItem.id}:`, error);
  }
}

// Main function to process the album
async function processAlbum(albumId : string) {
  try {
    const { data } = await photos.mediaItems.search({
      requestBody: {
        albumId: albumId,
        pageSize: 100 // Adjust as needed
      }
    });

    for (const mediaItem of data.mediaItems) {
      await downloadAndUploadPhoto(mediaItem);
    }
  } catch (error) {
    console.error('Error processing album:', error);
  }
}

processAlbum(GOOGLE_ALBUM_ID);
