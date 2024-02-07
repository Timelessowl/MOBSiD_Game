import AuthScreen from '../../pages/auth-screen/auth-screen';
import {Fragment} from 'react';
import GameScreen from '../../pages/game-screen/game-screen';

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<GameScreen />} />
          <Route path='auth' element={<AuthScreen />}>
          </Route>
        </Route>
        <Route path="*" element={
          <Fragment>
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
            <Link to="/">Go to main page</Link>
          </Fragment>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
