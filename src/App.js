import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoutes from './helpers/ProtectedRoute';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import Spinner from './components/Spinner';

//using lazy loader to pull in only needed components
const Profile = lazy(() => import('./pages/profile'));
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const SignUp = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <IsUserLoggedIn
              path={ROUTES.LOGIN}
              loggedInPath={ROUTES.DASHBOARD}
              user={user}
            >
              <Login />
            </IsUserLoggedIn>

            <IsUserLoggedIn
              path={ROUTES.SIGN_UP}
              loggedInPath={ROUTES.DASHBOARD}
              user={user}
            >
              <SignUp />
            </IsUserLoggedIn>

            <Route path={ROUTES.PROFILE} component={Profile} />

            <ProtectedRoutes path={ROUTES.DASHBOARD} exact user={user}>
              <Dashboard />
            </ProtectedRoutes>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
