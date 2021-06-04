import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

const usePhotos = (user) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      let followedUserPhotos = [];

      if (user?.following.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, following); //sorting photos by date created where newest photo is first
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    };

    getTimelinePhotos();
  }, [user?.userId]);

  return { photos };
};

export default usePhotos;
