import axios from 'axios';

export interface IResponse {
  [key: string]: any;
}

const SPOTIFY_API_URL: string = 'https://api.spotify.com/v1';

const HTTP = (function setAxiosInstance() {
  const axiosInstance = axios.create({ baseURL: SPOTIFY_API_URL });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
      return config;
    },
    (err) => Promise.reject(err),
  );

  return axiosInstance;
})();

export async function getArtistAlbums(): Promise<IResponse> {
  try {
    // return await HTTP.get(`/albums/0sNOF9WDwhWunNAHPD3Baj`);
    return await HTTP.get(`/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums`);
  } catch (e) {
    return e.toJSON();
  }
}

export async function getAlbum(id: string) {
  try {
    return await HTTP.get(`/albums/${id}`);
  } catch (e) {
    return e.toJSON();
  }
}

export async function getMySavedAlbums() {
  try {
    return await HTTP.get('/me/albums');
  } catch (e) {
    return e.toJSON();
  }
}