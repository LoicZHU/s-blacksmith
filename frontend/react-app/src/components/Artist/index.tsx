import { Redirect } from 'react-router-dom';

import Menu from '../Menu';
import ArtistAlbums from './ArtistAlbums';

import './artist.scss';

function Artist() {
  const isTokenInLocalStorage: string | null = localStorage.getItem('access_token');

  return (
    <>
      {!isTokenInLocalStorage ? (
        <Redirect to={'/login'} />
      ) : (
        <div className={'artist'}>
          <div className={'artist__menu'}>
            <Menu />
          </div>
          <div className={'artist__album'}>
            <h2>Albums</h2>
            <ArtistAlbums />
          </div>
        </div>
      )}
    </>
  );
}

export default Artist;
