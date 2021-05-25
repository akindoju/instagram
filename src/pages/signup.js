import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = email === '' || password === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username); //if username already exists, doesUsernameExist = true

    if (!usernameExists.length /*if false*/) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('That username already exists');
    }
  };

  useEffect(() => {
    document.title = 'SignUp - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iphone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form method="POST" onSubmit={handleSignUp}>
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <input
              type="text"
              aria-label="Enter your Full Name"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />

            <input
              type="text"
              aria-label="Enter your Username"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 outline-none"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
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
              className={` bg-blue-medium text-white w-full rounded h-8 font-bold hover:bg-blue-medium_hover  focus:outline-none ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">Already have an account?</p>
          <Link
            to={ROUTES.LOGIN}
            className="font-bold text-blue-medium hover:text-blue-medium_hover"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
