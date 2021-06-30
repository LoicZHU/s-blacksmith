const AUTH_ENDPOINT: string = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI: string = process.env.REACT_APP_REDIRECT_URI || '';
const CLIENT_ID: string = process.env.REACT_APP_CLIENT_ID || '';
const SCOPES: string[] = [
  'ugc-image-upload',
  'user-read-recently-played',
  'user-top-read',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
];

export const ACCESS_URL: string = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
  '%20',
)}&response_type=token&show_dialog=true`;

export function getToken() {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: { [key: string]: string }, item: string) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
}
