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
          <main className={'artist__album'}>
            <section>
              <h2>Albums</h2>
              <ArtistAlbums />
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default Artist;
