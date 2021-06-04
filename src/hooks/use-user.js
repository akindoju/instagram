import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

const useUser = (userId) => {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    };

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser };
};

export default useUser;
