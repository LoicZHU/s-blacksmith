import { NavLink } from 'react-router-dom';

import './menu.scss';

const LINKS: { path: string; label: string }[] = [
  { path: '/un-artiste', label: 'Un artiste' },
  { path: '/mon-espace', label: 'Mon espace' },
];

function Menu() {
  const isTokenInLocalStorage: string | null = localStorage.getItem('access_token');

  const removeTokenInLocalStorage = (): void => {
    localStorage.removeItem('access_token');
  };

  return (
    <div className={'sidebar'}>
      <header className={'sidebar__header'}>
        <h1>
          <NavLink to={'/'}>Accueil</NavLink>
        </h1>
      </header>

      <div className={'sidebar__menu'}>
        <nav>
          <ul>
            {LINKS.map((link) => (
              <li key={link.path}>
                <NavLink activeClassName={'selected'} to={link.path}>{link.label}</NavLink>
              </li>
            ))}
            {!isTokenInLocalStorage ? (
              <li key={'/login'}>
                <NavLink activeClassName={'selected'} to={'/login'}>Connexion</NavLink>
              </li>
            ) : (
              <li key={'/logout'}>
                <NavLink to={'/'} onClick={removeTokenInLocalStorage}>
                  Déconnexion
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
