import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      //sorting photos by date created where newest photo is first
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };

    getTimelinePhotos();
  }, [userId]);

  return { photos };
};

export default usePhotos;
