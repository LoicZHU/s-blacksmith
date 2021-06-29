import { useEffect } from 'react';

import { getToken } from '../../utils/spotify';
import Menu from '../Menu';

import './home.scss';

function Home() {
  useEffect(() => {
    const hashObj = getToken();

    if (!window.location.hash) {
      // nothing
    } else {
      removeHashFromUrl();
    }

    const _token: string | null = hashObj['access_token'];

    if (!_token) {
      return;
    } else {
      localStorage.setItem('access_token', _token);
    }
  }, []);

  const removeHashFromUrl = (): void => {
    window.location.hash = '';
  };

  return (
    <div className={'home'}>
      <div className={'home__menu'}>
        <Menu />
      </div>
      <div className={'home__body'}>
        <p>
          <span role={'img'} aria-label={'smile with sunglasses'}>
            😎
          </span>{' '}
          Cette application permet d'utiliser quelques fonctionnalités offertes par Spotify.
        </p>
      </div>
    </div>
  );
}

export default Home;
