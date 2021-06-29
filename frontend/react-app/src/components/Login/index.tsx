import { Redirect } from 'react-router-dom';

import { ACCESS_URL } from '../../utils/spotify';

import './login.scss';

function Login() {
  const isTokenInLocalStorage: string | null = localStorage.getItem('access_token');

  return (
    <>
      {!isTokenInLocalStorage ? (
        <main className={'login'}>
          <h1>Connexion</h1>
          <a href={ACCESS_URL}>Se connecter à Spotify</a>
        </main>
      ) : (
        <Redirect to={'/'} />
      )}
    </>
  );
}

export default Login;
