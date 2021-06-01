import { useEffect } from 'react';
import { useReducer } from 'react';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../services/firebase';
import Header from './Header';
import PropTypes from 'prop-types';
import Photos from './Photos';

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initalState = {
    profile: {},
    photoCollection: [],
    followerCount: 0,
  };

  const [{ profile, photoCollection, followerCount }, dispatch] = useReducer({
    reducer,
    initalState,
  });

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photoCollection: photos,
        followerCount: user.followers.length,
      });
    };

    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header />
      <Photos photos={photoCollection} />
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
