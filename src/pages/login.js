import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FirebaseContext from '../context/firebase';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login - Instagram';
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
        <p>I will be the form!</p>
      </div>
    </div>
  );
};

export default Login;
