import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Artist from './components/Artist';
import MySpace from './components/MySpace';
import Album from './components/Album';

function App() {
  return (
    <Switch>
      <Route path={'/login'} component={Login} />
      <Route path={'/un-artiste'} exact component={Artist} />
      <Route path={'/album/:id'} component={Album} />
      <Route path={'/mon-espace'} component={MySpace} />
      <Route path={'/'} exact component={Home} />
      <Redirect to={'/'} />
    </Switch>
  );
}

export default App;
