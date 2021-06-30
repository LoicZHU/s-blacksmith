# Spotify API

## Getting started
### Install dependencies
- Go into `frontend/react-app/` folder and install either with `npm install` or `yarn`.

### Spotify developer
- At https://developer.spotify.com/dashboard/, log in, get and copy your client ID.
- In the `frontend/src/.env` file, fill the `REACT_APP_CLIENT_ID` with your client ID.
- If your Spotify app is not already set, you may need to edit its settings and add a redirect URI: `http://localhost:3000/`.

### Launch app 🚀
- Go into `frontend/react-app/` folder, launch the React local server with: `npm start` (if you chose `npm install`) or `yarn start` (if you chose `yarn`). Enjoy!