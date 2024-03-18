/* eslint-disable */
import AuthScreen from '../../pages/auth-screen/auth-screen';
import Load from "../load/load";
import GameScreen from '../../pages/game-screen/game-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from "../../const";
import AdminScreen from "../../pages/admin-screen/admin-screen";


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Load/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<GameScreen />} />
          <Route path='auth' element={<AuthScreen />}>
          </Route>
          <Route path='admin' element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AdminScreen/>
            </PrivateRoute>
          }>
          </Route>
        </Route>
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
