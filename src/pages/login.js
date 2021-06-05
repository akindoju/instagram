import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = email.length < 1 || password.length < 1;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Kik';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Kik"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form method="POST" onSubmit={handleLogin}>
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold hover:bg-blue-medium_hover  focus:outline-none ${
                isInvalid && 'opacity-50 cursor-default'
              }`}
              disabled={isInvalid}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">Don't have an account?</p>
          <Link
            to={ROUTES.SIGN_UP}
            className="font-bold text-blue-medium hover:text-blue-medium_hover"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
