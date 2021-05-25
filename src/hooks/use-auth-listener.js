import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      //we have a user...therefore we can store the user in localstorage

      if (authUser) {
        localStorage.setItem(
          'authUser' /*variable name of obj stored in LS */,
          JSON.stringify(authUser /*Actual obj stored in LS */)
        );
        setUser(authUser);
      } else {
        //we don't have a user...therefore clear LS - localstorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
};

export default useAuthListener;
