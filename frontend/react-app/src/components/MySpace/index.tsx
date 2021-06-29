import { Redirect } from 'react-router-dom';

import Menu from '../Menu';
import MyAlbums from './MyAlbums';

import './myspace.scss';

function MySpace() {
  const isTokenInLocalStorage: string | null = localStorage.getItem('access_token');

  return (
    <>
      {!isTokenInLocalStorage ? (
        <Redirect to={'/login'} />
      ) : (
        <div className={'myspace'}>
          <div className={'myspace__menu'}>
            <Menu />
          </div>
          <div className={'myspace__myalbums'}>
            <h2>Mes albums préférés</h2>
            <MyAlbums />
          </div>
        </div>
      )}
    </>
  );
}

export default MySpace;
